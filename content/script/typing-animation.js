let typingSpeed = 50;
const max = 50;
const min = 10;
let currentLine = 0;

document.addEventListener("DOMContentLoaded", function() {
    typeText();
});

const typeText = () => {
    const zones = document.querySelectorAll('.cmd');
    zones.forEach(zone => {
        const lines = zone.querySelectorAll('.typing-animation');
        if (lines && lines.length > 0) {
            const text = lines[0].getAttribute('data-text');
            lines[0].classList.add('currently-typing');
            typeLetter(lines[0], text, 0, lines);
        }
    });
};

const typeLetter = (line, text, position, allLines) => {
    if (position < text.length) {
        line.textContent += text.charAt(position);
        typingSpeed = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(() => typeLetter(line, text, position + 1, allLines), typingSpeed);
    } else {
        line.classList.remove('currently-typing');
        if (allLines.length > 1) {
            allLines[1].classList.add('currently-typing');
            const nextText = allLines[1].getAttribute('data-text');
            typeLetter(allLines[1], nextText, 0, Array.from(allLines).slice(1));
        } else {
            line.classList.add('last-typed');
        }
    }
};
