document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const timeElement = document.querySelector('.time span');
    const playButton = document.querySelector('.play');
    const restartButton = document.querySelector('.restart');
    const lapButton = document.getElementById('lapButton');
    const lapContainer = document.querySelector('.lap-container');
    const themeButton = document.querySelector('.theme');
    const background = document.querySelector('.background');
    const clock = document.querySelector('.clock');
    const moonIcon = document.querySelector('.fa-moon');

    // Variables
    let isRunning = false;
    let startTime;
    let elapsedTime = 0;
    let interval;
    const lapTimes = [];

    // Event listeners
    playButton.addEventListener('click', togglePlay);
    restartButton.addEventListener('click', restart);
    lapButton.addEventListener('click', addLap);
    themeButton.addEventListener('click', toggleTheme);

    // Functions
    function togglePlay() {
        if (isRunning) {
            // Pause the stopwatch
            clearInterval(interval);
            isRunning = false;
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            // Start the stopwatch
            startTime = Date.now() - elapsedTime;
            interval = setInterval(updateTime, 100);
            isRunning = true;
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    }

    function updateTime() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        displayTime(elapsedTime);
    }

    function displayTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timeElement.textContent = formattedTime;
    }

    function restart() {
        // Stop the stopwatch and reset values
        clearInterval(interval);
        isRunning = false;
        elapsedTime = 0;
        displayTime(elapsedTime);
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        lapTimes.length = 0; // Clear lap times array
        clearLapDisplay();
    }

    function addLap() {
        if (isRunning) {
            const lapTime = elapsedTime;
            lapTimes.push(lapTime);

            // Display lap time on the screen
            const lapIndex = lapTimes.length;
            const formattedLapTime = formatLapTime(lapTime);
            createLapElement(`Lap ${lapIndex}: ${formattedLapTime}`);
        }
    }

    function formatLapTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
    }

    function createLapElement(content) {
        const lapElement = document.createElement('div');
        lapElement.textContent = content;
        lapContainer.appendChild(lapElement);
    }

    function clearLapDisplay() {
        lapContainer.innerHTML = ''; // Clear lap display container
    }

    function toggleTheme() {
        // Toggle dark mode class on the body element
        document.body.classList.toggle('dark-mode');

        // Update colors based on the theme
        if (document.body.classList.contains('dark-mode')) {
            // Dark mode
            background.style.backgroundColor = 'rgb(33, 33, 33)';
            clock.style.backgroundColor = 'rgb(33, 33, 33)';
            timeElement.style.color = 'white';
            themeButton.style.backgroundColor = 'white';
            themeButton.style.color = 'rgb(33, 33, 33)';
            moonIcon.style.color = 'rgb(33, 33, 33)';
        } else {
            // Light mode
            background.style.backgroundColor = 'white';
            clock.style.backgroundColor = 'rgb(255, 255, 255)';
            timeElement.style.color = 'orange';
            themeButton.style.backgroundColor = 'rgb(65, 63, 63)';
            themeButton.style.color = 'white';
            moonIcon.style.color = 'white';
        }
    }
});
