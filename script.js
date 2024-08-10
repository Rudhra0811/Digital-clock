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

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Additional functionality: Change clock color every minute
function changeClockColor() {
    const clockElement = document.getElementById('clock');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    clockElement.style.color = "#" + randomColor;
}

// Change clock color immediately and then every minute
changeClockColor();
setInterval(changeClockColor, 60000);

// Additional functionality: Add greeting based on time of day
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

    // Create or update greeting element
    let greetingElement = document.getElementById('greeting');
    if (!greetingElement) {
        greetingElement = document.createElement('div');
        greetingElement.id = 'greeting';
        greetingElement.style.fontSize = '20px';
        greetingElement.style.color = '#ffffff';
        greetingElement.style.textAlign = 'center';
        greetingElement.style.marginTop = '10px';
        document.querySelector('.clock-container').appendChild(greetingElement);
    }
    greetingElement.textContent = greeting;
}

// Update greeting immediately and then every hour
updateGreeting();
setInterval(updateGreeting, 3600000);