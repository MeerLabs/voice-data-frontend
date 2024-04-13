class AudioRecorder {
    constructor(container) {
        this.container = container;
        this.id = container.id;
        this.audio = container.querySelector('audio');
        this.recordingDurationDisplay = container.querySelector('.recordingDuration');
        this.startButton = container.querySelector('.btnStart');
        this.stopButton = container.querySelector('.btnStop');
        this.submitButton = container.querySelector('.btnSubmit');
        this.mediaRecorder = null;
        this.chunks = [];
        this.startTime = null;
        this.timerId = null;
        this.Blob = null;

        this.init();
    }

    async init() {
        try {
            let constraintObj = { 
                audio: true, 
                video: false
            };
            
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraintObj);
            this.mediaRecorder = new MediaRecorder(mediaStream);

            this.mediaRecorder.ondataavailable = (e) => {
                this.chunks.push(e.data);
              };

            this.startButton.addEventListener('click', () => {                
                this.startRecording();
            });
            this.stopButton.addEventListener('click', () => {                
                this.stopRecording();
            });
            this.submitButton.addEventListener('click', () => {          
                if (this.Blob) {
                    this.uploadAudio(this.Blob);
                } else {
                    alert('No recorded audio available.');
                }
            });
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    }       

    startRecording() {
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        this.chunks = [];
        this.startTime = Date.now();
        this.timerId = setInterval(() => this.updateRecordingDuration(), 1000);
        this.mediaRecorder.start();
    }

    stopRecording() {
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        clearInterval(this.timerId);
        this.mediaRecorder.stop();
    
        // Handle Blob creation and audio playback
        this.mediaRecorder.onstop = () => {
            this.Blob = new Blob(this.chunks);
            const audioURL = window.URL.createObjectURL(this.Blob);
    
            // Update the existing <audio> element's src attribute
            this.audio.src = audioURL;
            this.audio.controls = true; // Ensure controls are enabled
    
            // Clear chunks array after processing
            this.chunks = [];
        };
    }    
    

    updateRecordingDuration() {
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.recordingDurationDisplay.textContent = `Recording duration: ${this.formatTime(elapsedTime)}`;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    uploadAudio(blob) {
        // Perform upload logic here (e.g., using fetch)
        // Assuming submitButton is your reference to the submit button element
        this.submitButton.disabled = true;

        const formData = new FormData();
        formData.append('audioFile', blob, 'audio.opus'); 
        let reporter = document.getElementById('modelName').value;
        formData.append('name', reporter+'-'+this.id); 
        fetch('/upload_audio', {
            method: 'POST',
            body: formData
            })
        .then(response => {
            if (response.ok) {
                alert('成功: Audio uploaded successfully!');
            } 
        })
        .catch(error => {
            console.error('Error uploading audio:', error);
        });
        this.submitButton.disabled = false;
    }
}
