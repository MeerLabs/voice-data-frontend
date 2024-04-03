class AudioRecorder {
    constructor(container) {
        this.container = container;
        this.audio = container.querySelector('audio');
        this.recordingDurationDisplay = container.querySelector('.recordingDuration');
        this.startStopButton = container.querySelector('.btnStartStop');
        this.mediaRecorder = null;
        this.chunks = [];
        this.startTime = null;
        this.timerId = null;

        this.init();
    }

    init() {
        let constraintObj = { 
            audio: true, 
            video: false
        };

        navigator.mediaDevices.getUserMedia(constraintObj)
        .then((mediaStreamObj) => {
            this.mediaRecorder = new MediaRecorder(mediaStreamObj);

            this.startStopButton.addEventListener('click', () => {
                if (this.mediaRecorder.state === 'inactive') {
                    this.startRecording();
                } else {
                    this.stopRecording();
                }
            });

            this.mediaRecorder.ondataavailable = (ev) => {
                this.chunks.push(ev.data);
            };

            this.mediaRecorder.onstop = () => {
                let blob = new Blob(this.chunks, { 'type' : 'audio/mp3;' });
                let audioURL = window.URL.createObjectURL(blob);
                this.audio.src = audioURL;
                //show audio
                container.insertBefore(audioElm, recordedAudioContainer.firstElementChild);
                container.classList.add('d-flex');
                container.classList.remove('d-none');
                this.chunks = [];
            };
        })
        .catch((err) => { 
            console.log(err.name, err.message); 
        });
    }

    startRecording() {
        this.chunks = [];
        this.startTime = Date.now();
        this.timerId = setInterval(() => this.updateRecordingDuration(), 1000);
        this.mediaRecorder.start();
        this.startStopButton.textContent = 'STOP RECORDING';
    }

    stopRecording() {
        clearInterval(this.timerId);
        this.mediaRecorder.stop();
        this.startStopButton.textContent = 'START RECORDING';
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
