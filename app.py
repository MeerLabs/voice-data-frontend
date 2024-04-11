from flask import Flask, render_template
import subprocess, sys

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", ind=1)

@app.route("/upload_audio", methods=["POST"])
def upload_audio():
    # Code to execute your Python script
    try:
        subprocess.run([sys.executable, "backend/shareServiceClient.py"])
        return "Script executed successfully", 200
    except Exception as e:
        return f"Error executing script: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)