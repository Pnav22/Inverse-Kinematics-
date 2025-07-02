import streamlit as st

# Load HTML file content
with open("static/ik_simulator.html", "r", encoding="utf-8") as f:
    html_code = f.read()

st.set_page_config(page_title="IK Simulator", layout="wide")

st.title("Inverse Kinematics Simulator")

# Embed the HTML/JS app here
st.components.v1.html(html_code, height=700, scrolling=True
