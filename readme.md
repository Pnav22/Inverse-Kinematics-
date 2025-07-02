# Inverse Kinematics Simulator
A dynamic, interactive IK simulation tool built in vanilla JavaScript and HTML Canvas — designed for robotics, animation, and educational use.

## Features
- Real-time inverse kinematics with drag interaction
- Math panel explaining each IK step
- Animate start/end movement with progress control

## Screenshots
![image](https://github.com/user-attachments/assets/82add2e4-1697-4a12-9525-19c932b70cc1)

## Use Cases
- Robotics simulation & arm design
- Biomechanics/kinematics visualization
- Animation prototyping
- Teaching forward/inverse kinematics concepts

## Try It Online
[Live Demo]([[https://yourusername.github.io/ik-simulator](https://epe5phdpk7lviau25hb6zs.streamlit.app/)](https://epe5phdpk7lviau25hb6zs.streamlit.app/))

## Tech Stack
- HTML + CSS + Vanilla JS
- Canvas 2D API
- No external libraries

## Math Behind It
Inverse Kinematics uses a solver (default: Geometric) to find joint angles such that the end effector reaches a target.  
Example equation:
