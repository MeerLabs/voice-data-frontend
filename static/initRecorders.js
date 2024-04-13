// Function to dynamically populate the audio input sources dropdown
function populateAudioSources() {
    const audioSourceSelect = document.getElementById('audioSource');

    // Clear existing options
    audioSourceSelect.innerHTML = '';

    // Fetch available audio input devices
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(device => {
                if (device.kind === 'audioinput') {
                    const option = document.createElement('option');
                    option.value = device.deviceId;
                    option.text = device.label || `Audio Input ${audioSourceSelect.options.length + 1}`;
                    audioSourceSelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error enumerating audio devices:', error);
        });
}

// Call the function to populate the audio input sources dropdown
populateAudioSources();
/*
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data
    fetch('static/script.json')
        .then(response => response.json())
        .then(data => {
            // Get the sections from the JSON data
            const section = data.sections[0];
            const scriptDiv = document.querySelector('.script');
            scriptDiv.textContent = section.content;
            })
})
*/

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data
    fetch('static/script.json')
        .then(response => response.json())
        .then(data => {
            // Get the sections from the JSON data
            const sections = data.sections;

            // Get the container element where the recorder divs will be appended
            const recorderContainer = document.getElementById('recorderContainer');
            
            // Create recorder divs for each section
            counter = 0;
            sections.forEach(section => {
                // Create elements
                const recorderDiv = document.createElement('div');
                recorderDiv.classList.add('recorder');
                recorderDiv.id = counter;

                const scriptDiv = document.createElement('div');
                scriptDiv.classList.add('script');
                scriptDiv.textContent = sections[counter].content;

                const startButton = document.createElement('button');
                startButton.classList.add('btnStart');
                startButton.textContent = '開始';

                const stopButton = document.createElement('button');
                stopButton.classList.add('btnStop');
                stopButton.textContent = '停止';

                const submitButton = document.createElement('button');
                submitButton.classList.add('btnSubmit');
                submitButton.textContent = '送出';

                const recordingDurationDiv = document.createElement('div');
                recordingDurationDiv.classList.add('recordingDuration');

                const audioElement = document.createElement('audio');
                audioElement.controls = true;

                // Append elements to recorder div
                recorderDiv.appendChild(scriptDiv);
                recorderDiv.appendChild(startButton);
                recorderDiv.appendChild(stopButton);
                recorderDiv.appendChild(recordingDurationDiv);
                recorderDiv.appendChild(audioElement);
                recorderDiv.appendChild(submitButton);

                // Append recorder div to container
                recorderContainer.appendChild(recorderDiv);
                new AudioRecorder(recorderDiv);
                counter += 1;
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
});
