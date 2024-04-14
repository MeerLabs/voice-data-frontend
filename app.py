from flask import Flask, render_template, request
import tempfile
import subprocess, sys, logging, os

app = Flask(__name__)
temp_dir = os.environ.get('TMPDIR') or os.environ.get('TEMP') or '/tmp'

# Configure Flask logging
app.logger.setLevel(logging.INFO)  # Set log level to INFO
handler = logging.FileHandler('app.log')  # Log to a file
app.logger.addHandler(handler)

@app.route("/")
def home():
    return render_template("index.html", ind=1)

@app.route("/upload_audio", methods=["POST"])
def upload_audio():
    app.logger.info('Received audio data')
    try:
        audio_file  = request.files['audioFile']
        name = request.form['name']
        path = os.path.join(temp_dir, 'tmp.wav')
       
        audio_file.save(path)

        script_path = 'backend/shareServiceClient.py'
        subprocess.run([sys.executable, script_path, path, name])

        return "Script executed successfully", 200
        
    except Exception as e:
        app.logger.info(f'{e}') 
        return f"Error executing script: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)