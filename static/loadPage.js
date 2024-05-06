document.addEventListener('DOMContentLoaded', function() {
    const recorderContainer = document.getElementById('recorderContainer');
    const changeContentButton = document.getElementById('changeContentButton');
    const pageDisplay = document.getElementById('pageDisplay');

    // Get the value of the lang parameter from the URL
    // Get the value of the 'ind' data attribute from the script tag
    const scriptTag = document.querySelector('script[src*="loadPage.js"]');
    const lang = scriptTag.getAttribute('data-ind');
    
    let currentPage = 1;
    const totalPages = 2; // Total number of pages

    // Initial content for page 1
    displayPageContent(currentPage);
    addRecorders(lang)

    // Event listener for button click
    changeContentButton.addEventListener('click', function() {
        if (currentPage === 1) {
            currentPage = 2;
            changeContentButton.textContent = '上一頁';
        } else {
            currentPage = 1;
            changeContentButton.textContent = '下一頁';
        }
        displayPageContent(currentPage);
        addRecorders(lang)
    });
    

    // Function to display content based on current page
    function displayPageContent(page) {
        // Clear existing content inside recorderContainer
        recorderContainer.innerHTML = '';
    
        // Update page display text
        pageDisplay.textContent = `Page ${page} of ${totalPages}`;
    }

    function addRecorders(lang) {
        // Fetch the JSON data
        let fetchUrl = lang === '2' ? 'static/script_en.json' : 'static/script.json';
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                // Get the sections from the JSON data
                const sections = data.sections;
                
                if (currentPage === 1) {
                    counter = 0; // For page 1, counter starts from 0
                } else if (currentPage === 2) {
                    counter = 15; // For page 2, counter starts from 10
                }
        
                // Loop through sections based on counter value
                for (let i = counter; i < counter + 15; i++) {
                    if (i >= sections.length) {
                        break; // Break loop if sections are exhausted
                    }
        
                    const section = sections[i];
        
                    // Create elements for each section
                    const recorderDiv = document.createElement('div');
                    recorderDiv.classList.add('recorder');
                    recorderDiv.id = i; // Set a unique id for each recorder

                    // Display the index number
                    const indexDisplay = document.createElement('p');
                    indexDisplay.textContent = `${i + 1}.`;
                    indexDisplay.classList.add('index-display');
                    recorderDiv.appendChild(indexDisplay);
        
                    const scriptDiv = document.createElement('div');
                    scriptDiv.classList.add('script');
                    scriptDiv.textContent = section.content;
        
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

                    if (lang === '2') {
                        startButton.textContent = 'Start';
                        stopButton.textContent = 'Stop';
                        submitButton.textContent = 'Submit';
                    } 
        
                    // Append elements to recorder div
                    recorderDiv.appendChild(indexDisplay);
                    recorderDiv.appendChild(scriptDiv);
                    recorderDiv.appendChild(startButton);
                    recorderDiv.appendChild(stopButton);
                    recorderDiv.appendChild(recordingDurationDiv);
                    recorderDiv.appendChild(audioElement);
                    recorderDiv.appendChild(submitButton);
        
                    // Append recorder div to container
                    recorderContainer.appendChild(recorderDiv);
        
                    // Initialize AudioRecorder for the current recorderDiv
                    new AudioRecorder(recorderDiv);
                }
            })
            .catch(error => {
                console.error('Error fetching JSON data:', error);
        });
    }
});
