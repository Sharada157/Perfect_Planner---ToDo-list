from flask import Flask, render_template
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

# Home
@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

# Tasks
@app.route("/tasks")
def tasks():
    return render_template("task.html")

# Notes
@app.route("/notes")
def notes():
    return render_template("notes.html")

# Profile
@app.route("/profile")
def profile():
    return render_template("profile.html")

# Progress
@app.route("/progress")
def progress():
    return render_template("progress.html")

# Settings
@app.route("/setting")
def setting():
    return render_template("setting.html")

# Timetable
@app.route("/timetable")
def timetable():
    return render_template("timetable.html")

if __name__ == "__main__":
    app.run(debug=True)
