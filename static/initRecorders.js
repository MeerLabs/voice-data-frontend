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
