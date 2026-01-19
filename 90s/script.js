
document.addEventListener('DOMContentLoaded', () => {
    console.log("🌟 Welcome to Luke's Fan Page! Established 1997. 🌟");
    console.log("May the Force be with you!");

    initHitCounter();
    initGuestbook();
    initTieFighter();
    initKonamiCode();
});

function initTieFighter() {
    const tie = document.getElementById('tie-fighter');
    let mouseX = 0;
    let mouseY = 0;
    let tieX = 0;
    let tieY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTie() {
        tieX += (mouseX - tieX) * 0.15;
        tieY += (mouseY - tieY) * 0.15;

        tie.style.left = (tieX + 15) + 'px';
        tie.style.top = (tieY + 15) + 'px';

        requestAnimationFrame(animateTie);
    }

    animateTie();
}

function initHitCounter() {
    const digits = document.querySelectorAll('.digit');
    
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    
    displayCounter(visitorCount, digits);
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            const randomDigit = digits[Math.floor(Math.random() * digits.length)];
            const currentVal = randomDigit.innerText;
            
            randomDigit.innerText = Math.floor(Math.random() * 10);
            randomDigit.style.color = '#FF0000';
            
            setTimeout(() => {
                randomDigit.innerText = currentVal;
                randomDigit.style.color = '#00FF00';
            }, 100);
        }
    }, 3000);
}

function displayCounter(count, digits) {
    const countStr = count.toString().padStart(digits.length, '0');
    
    countStr.split('').forEach((digit, index) => {
        digits[index].innerText = digit;
        digits[index].style.color = '#FFFF00';
        setTimeout(() => {
            digits[index].style.color = '#00FF00';
        }, 200);
    });
}

function initGuestbook() {
    const guestbookImage = document.querySelector('.guestbook');
    
    if (guestbookImage) {
        guestbookImage.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get current visitor count
            const digits = document.querySelectorAll('.digit');
            let visitorNumber = '';
            digits.forEach(digit => {
                visitorNumber += digit.innerText;
            });
            
            // Show classic alert
            alert(`✨ Thank you for signing my guestbook! ✨\n\nYou are visitor #${visitorNumber}!\n\nMay the Force be with you! 🌟`);
            
            // Add a "signed" effect
            console.log(`New guestbook entry from visitor #${visitorNumber}`);
        });
    }
}

function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiCode() {
    alert("🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou have unlocked the secret Jedi power!");
    
    // Add rainbow effect
    document.body.classList.add('konami');
    
    // Play with colors
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'];
    let colorIndex = 0;
    
    const colorInterval = setInterval(() => {
        document.body.style.color = colors[colorIndex % colors.length];
        colorIndex++;
    }, 500);
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.body.classList.remove('konami');
        document.body.style.color = '#00FF00';
        clearInterval(colorInterval);
        alert("The Force returns to normal...");
    }, 10000);
}

// ============================================
// ADDITIONAL 90s EFFECTS
// ============================================

// Random "sparkle" cursor effect
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = `radial-gradient(circle, #FFFF00, transparent)`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9997';
    sparkle.style.animation = 'sparkle-fade 1s ease-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Random alert messages (classic 90s websites did this!)
const randomAlerts = [
    "You're the 1000th visitor! (Just kidding, or am I?)",
    "Don't forget to bookmark this page!",
    "Tell your friends about this site!",
    "This page looks best in Netscape Navigator 4.0",
    "May the Force be with you, always!"
];

// Occasionally show random messages
let alertShown = false;
setTimeout(() => {
    if (!alertShown && Math.random() > 0.7) {
        const randomMessage = randomAlerts[Math.floor(Math.random() * randomAlerts.length)];
        alert(randomMessage);
        alertShown = true;
    }
}, 15000);

// Log fun message
console.log(`
    ╔════════════════════════════════════════╗
    ║  LUKE'S JEDI ACADEMY - Since 1997     ║
    ║  May the Force be with you!           ║
    ║                                        ║
    ║  Thanks for visiting!                 ║
    ║  - Your friendly neighborhood webmaster║
    ╚════════════════════════════════════════╝
`);

// Prevent right-click (classic 90s move!)
document.addEventListener('contextmenu', (e) => {
    if (Math.random() > 0.5) {  // Only sometimes, to not be too annoying
        e.preventDefault();
        alert("⚠️ No right-clicking on this page!\n\n(Just kidding, you can right-click. This is just for authenticity!)");
        return false;
    }
});

// Page load message
window.addEventListener('load', () => {
    console.log("🌟 Page fully loaded! The Force is strong with this one!");
});