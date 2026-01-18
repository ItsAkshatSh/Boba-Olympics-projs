window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('hidden');
        }, 2000);
});

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.15;
    followerY += dy * 0.15;
    
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight);
        document.querySelector('.progress-bar').style.transform = `scaleX(${scrolled})`;
});

const sections = document.querySelectorAll('section');
        
const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.75;
                
            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            }
        });
};

window.addEventListener('scroll', revealSection);
revealSection(); 

const soundToggle = document.getElementById('soundToggle');
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

soundToggle.addEventListener('click', () => {
        if (!isPlaying) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 110; // Low ambient hum
            gainNode.gain.value = 0.02; // Very subtle
               
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
                
            soundToggle.classList.add('active');
            isPlaying = true;
        } else {
            oscillator.stop();
            audioContext.close();
            soundToggle.classList.remove('active');
            isPlaying = false;
        }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                    target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                    });
            }
        });
});


window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero h1, .hero .subtitle');
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
});