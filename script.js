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
}

function changeClockColor() {
    const clockElement = document.getElementById('clock');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
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
    const newImage = `https://source.unsplash.com/1600x900/?nature,water&timestamp=${new Date().getTime()}`;
    
    body.style.backgroundImage = `url('${newImage}')`;
    
    // Update background credit
    fetch(`https://api.unsplash.com/photos/random?query=nature,water&client_id=YOUR_UNSPLASH_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const credit = `Photo by ${data.user.name} on Unsplash`;
            document.getElementById('background-credit').textContent = credit;
        })
        .catch(error => console.error('Error fetching image data:', error));
}

function applyFadeInEffect() {
    const elements = document.querySelectorAll('.clock, .date, .day, .greeting');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Initial calls
updateClock();
changeClockColor();
updateGreeting();
changeBackground();
applyFadeInEffect();

// Set intervals for periodic updates
setInterval(updateClock, 1000);
setInterval(changeClockColor, 60000);
setInterval(updateGreeting, 3600000);
setInterval(changeBackground, 3600000);