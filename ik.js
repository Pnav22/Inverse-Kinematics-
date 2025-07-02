const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Joint {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.child = null;
  }
}

// Initialize chain
let joints = [];
let baseX = canvas.width / 2;
let baseY = canvas.height / 2;

function createChain(n = 5, length = 80) {
  joints = [];
  let x = baseX, y = baseY;
  for (let i = 0; i < n; i++) {
    const joint = new Joint(x, y, length);
    if (i > 0) joints[i - 1].child = joint;
    x += length;
    y += 0;
    joints.push(joint);
  }
}

createChain();

let target = { x: joints[joints.length - 1].x, y: joints[joints.length - 1].y };
let dragging = false;

canvas.addEventListener("mousedown", (e) => {
  dragging = true;
  target.x = e.clientX;
  target.y = e.clientY;
});

canvas.addEventListener("mouseup", () => {
  dragging = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    target.x = e.clientX;
    target.y = e.clientY;
  }
});

// FABRIK algorithm
function solveIK() {
  const tolerance = 0.5;
  let endEffector = joints[joints.length - 1];
  let dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  if (dist(joints[0], target) > joints.length * joints[0].length) {
    // Unreachable: stretch in direction
    let angle = Math.atan2(target.y - joints[0].y, target.x - joints[0].x);
    joints[0].x = baseX;
    joints[0].y = baseY;

    for (let i = 1; i < joints.length; i++) {
      joints[i].x = joints[i - 1].x + joints[i - 1].length * Math.cos(angle);
      joints[i].y = joints[i - 1].y + joints[i - 1].length * Math.sin(angle);
    }
  } else {
    let bX = joints[0].x, bY = joints[0].y;
    let diff = dist(endEffector, target);

    let maxIter = 10;
    let iter = 0;
    while (diff > tolerance && iter++ < maxIter) {
      // Backward
      endEffector.x = target.x;
      endEffector.y = target.y;

      for (let i = joints.length - 2; i >= 0; i--) {
        let dx = joints[i].x - joints[i + 1].x;
        let dy = joints[i].y - joints[i + 1].y;
        let d = Math.hypot(dx, dy);
        let r = joints[i].length / d;
        joints[i].x = joints[i + 1].x + dx * r;
        joints[i].y = joints[i + 1].y + dy * r;
      }

      // Forward
      joints[0].x = bX;
      joints[0].y = bY;
      for (let i = 1; i < joints.length; i++) {
        let dx = joints[i].x - joints[i - 1].x;
        let dy = joints[i].y - joints[i - 1].y;
        let d = Math.hypot(dx, dy);
        let r = joints[i - 1].length / d;
        joints[i].x = joints[i - 1].x + dx * r;
        joints[i].y = joints[i - 1].y + dy * r;
      }

      diff = dist(endEffector, target);
    }
  }
}

// Draw chain
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#00FFFF";
  ctx.fillStyle = "#FF4081";

  ctx.beginPath();
  ctx.arc(target.x, target.y, 6, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < joints.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(joints[i].x, joints[i].y);
    ctx.lineTo(joints[i + 1].x, joints[i + 1].y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(joints[i].x, joints[i].y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw last joint
  let end = joints[joints.length - 1];
  ctx.beginPath();
  ctx.arc(end.x, end.y, 5, 0, Math.PI * 2);
  ctx.fill();
}

// Animation loop
function animate() {
  solveIK();
  draw();
  requestAnimationFrame(animate);
}

animate();
