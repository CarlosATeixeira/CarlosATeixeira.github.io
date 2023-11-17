let typingSpeed = 50;
const max = 2;
const min = 0;
let currentLine = 0;
const zone = document.querySelector('#loading-container');

document.addEventListener("DOMContentLoaded", function() {
    const loadingMessages = [
        "Compiling latest courses...",
        "Initializing student profiles...",
        "Building course outlines...",
        "Syncing with academic calendar...",
        "Establishing secure connections...",
        "Populating course materials...",
        "Loading assessment engines...",
        "Integrating real-time collaboration tools...",
        "Setting up virtual classrooms...",
        "Processing learning analytics...",
        "Optimizing media resources...",
        "Loading language packs...",
        "Preparing scientific simulations...",
        "Activating art and design workshops...",
        "Synchronizing cloud storage...",
        "Enhancing user experience...",
        "Ensuring compliance with educational standards...",
        "Establishing mentorship networks...",
        "Loading historical archives...",
        "Updating coding sandboxes...",
        "Caching resource libraries for offline access...",
        "Enabling progress tracking systems...",
        "Finalizing extracurricular activities...",
        "-",
        "Finished loading!",
        "-"
      ];

    const loadingContainer = document.getElementById('loading-container');

    // Create a span for each loading message and append to the container
    loadingMessages.forEach((message, index) => {
        let span = document.createElement('span');
        span.className = 'typing-animation';
        span.setAttribute('data-text', message);
        loadingContainer.appendChild(span);
    });
    
    typeText();
});

function typeText(){
    const lines = zone.querySelectorAll('.typing-animation');
    if (lines && lines.length > 0) {
        const text = lines[0].getAttribute('data-text');
        lines[0].classList.add('currently-typing');
        typeLetter(lines[0], text, 0, lines);
    }
};

const typeLetter = (line, text, position, allLines) => {
    if (position < text.length) {
        line.textContent += text.charAt(position);
        typingSpeed = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(() => typeLetter(line, text, position + 1, allLines), typingSpeed);
    } else {
        line.classList.remove('currently-typing');
        currentLine++; // Increment the line counter

        if (currentLine < allLines.length) {
            allLines[currentLine].classList.add('currently-typing');
            const nextText = allLines[currentLine].getAttribute('data-text');
            typeLetter(allLines[currentLine], nextText, 0, allLines);
        } else {
            // Once all lines are typed out, call the Redirecting function
            Redirecting();
        }
    }
};



function Redirecting(){
    // Since it's an ID, there should be only one element, so we use document.querySelector
    let countdown = 3;
    let span = document.createElement('span');
    span.className = 'redirecting';
    span.textContent = `Redirecting in ... ${countdown}`;
    zone.appendChild(span);

    // Assuming you want to update the countdown every second
    const intervalId = setInterval(() => {
    countdown--;
    span.textContent = `Redirecting in ... ${countdown}`;
    if (countdown === 0) {
        clearInterval(intervalId);
        window.location.replace('resumo.html'); // Or your desired URL
    }
    }, 1000);
}
