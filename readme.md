# Inverse Kinematics Simulator
A dynamic, interactive IK simulation tool built in vanilla JavaScript and HTML Canvas — designed for robotics, animation, and educational use.

## Features
- Real-time inverse kinematics with drag interaction
- Math panel explaining each IK step
- Animate start/end movement with progress control
- Export joint data as CSV/JSON
- Obstacle-aware path planning (coming soon)
- Forward Kinematics mode (coming soon)
- Educational tab with algorithm visualizations and LaTeX-rendered equations
- Support for CCD and FABRIK algorithms (coming soon)

## Screenshots
![demo screenshot](./screenshots/ik-demo.png)

## Use Cases
- Robotics simulation & arm design
- Biomechanics/kinematics visualization
- Animation prototyping
- Teaching forward/inverse kinematics concepts

## Try It Online
[Live Demo](https://yourusername.github.io/ik-simulator)

## Tech Stack
- HTML + CSS + Vanilla JS
- Canvas 2D API
- No external libraries

## Math Behind It
Inverse Kinematics uses a solver (default: Geometric) to find joint angles such that the end effector reaches a target.  
Example equation:
