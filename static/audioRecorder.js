class AudioRecorder {
    constructor(container) {
        this.container = container;
        this.audio = container.querySelector('audio');
        this.recordingDurationDisplay = container.querySelector('.recordingDuration');
        this.startButton = container.querySelector('.btnStart');
        this.stopButton = container.querySelector('.btnStop');
        this.mediaRecorder = null;
        this.chunks = [];
        this.startTime = null;
        this.timerId = null;

        this.init();
    }

    async init() {
        let constraintObj = { 
            audio: true, 
            video: false
        };
        
        const mediaStream = navigator.mediaDevices.getUserMedia(constraintObj)
        .then((mediaStreamObj) => {
            this.mediaRecorder = new MediaRecorder(mediaStreamObj);

            this.startButton.addEventListener('click', () => {                
                    this.startRecording();
                });
            this.stopButton.addEventListener('click', () => {                
                    this.stopRecording();
                });
            })
        .then(() => this.gotStream())
        
        };

    gotStream() {
       
        this.mediaRecorder.ondataavailable = (ev) => {
            this.chunks.push(ev.data);
        
            if (this.mediaRecorder.state == "inactive"){
            let blob = new Blob(this.chunks,{type:'audio/x-mpeg-3'});
            let audioURL = window.URL.createObjectURL(blob);
            this.audio.src = audioURL;
            this.audio.controls=true;
            this.chunks = [];
            }
        }}
        
          
    startRecording() {
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        this.chunks = [];
        this.startTime = Date.now();
        this.timerId = setInterval(() => this.updateRecordingDuration(), 1000);
        this.mediaRecorder.start();
    };

    stopRecording() {
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        clearInterval(this.timerId);
        this.mediaRecorder.stop();
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
}

document.addEventListener('DOMContentLoaded', () => {
    const recorders = document.querySelectorAll('.recorder');
    recorders.forEach((recorder) => new AudioRecorder(recorder));
});
