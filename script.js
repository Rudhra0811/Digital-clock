// Global variables
let backgroundChangeTimeout;

function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const dayElement = document.getElementById('day');

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Update date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);

    // Update day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayElement.textContent = days[now.getDay()];

    // Update greeting
    updateGreeting();
}

function changeClockColor() {
    const clockElement = document.getElementById('clock');
    const randomColor = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    clockElement.style.color = "#" + randomColor;
}

function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good morning!";
    } else if (hours < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    document.getElementById('greeting').textContent = greeting;
}

function changeBackground() {
    const body = document.body;
    
    fetch('https://api.unsplash.com/photos/random?query=nature,water&client_id=pvYSp1U8cfLUE0jmKgUcrCiLk2vkrBm1D821Uc0nV_k')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.full;
            const photographer = data.user.name;
            const profileUrl = data.user.links.html;
            
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                body.style.backgroundImage = `url('${imageUrl}')`;
                updatePhotoCredit(photographer, profileUrl);
            };
            img.onerror = () => {
                console.error('Error loading background image');
                // Retry after 1 minute
                backgroundChangeTimeout = setTimeout(changeBackground, 60000);
            };
        })
        .catch(error => {
            console.error('Error fetching image data:', error);
            // Retry after 1 minute
            backgroundChangeTimeout = setTimeout(changeBackground, 60000);
        });
}

function updatePhotoCredit(photographer, profileUrl) {
    const creditElement = document.getElementById('photo-credit');
    creditElement.innerHTML = `Photo by <a href="${profileUrl}" target="_blank">${photographer}</a> on Unsplash`;
}

function applyFadeInEffect() {
    const elements = document.querySelectorAll('.clock, .date, .day, .greeting');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Initial calls
function init() {
    updateClock();
    changeClockColor();
    changeBackground();
    applyFadeInEffect();

    // Set intervals for periodic updates
    setInterval(updateClock, 1000);
    setInterval(changeClockColor, 60000);
    setInterval(() => {
        clearTimeout(backgroundChangeTimeout);
        changeBackground();
    }, 3600000); // Change background every hour
}

// Start the clock when the page loads
window.addEventListener('load', init);