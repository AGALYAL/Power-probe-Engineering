// Scroll Navbar Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Active Link Highlight
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Particle Animation for Hero Background
const createParticles = () => {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    heroBg.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const init = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.querySelector('.hero').clientHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 179, 89, ${p.alpha})`;
            ctx.fill();

            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 179, 89, ${0.12 - dist/1000})`;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();
};

// Organic Home Section Drone Animation
const initDroneSystem = () => {
    const drone = document.querySelector('.drone-system');
    const hero = document.querySelector('.hero');
    if (!drone || !hero) return;

    let time = 0;
    let driftTime = 0;

    const animate = () => {
        time += 0.008; // Wobble speed
        driftTime += 0.002; // Drift speed

        const width = window.innerWidth;
        const height = hero.clientHeight;
        const isMobile = window.innerWidth < 768;

        // Path: Tight Drift (Small, centered movement)
        const centerX = width / 2 + Math.sin(driftTime) * (width * 0.05);
        const centerY = height * 0.4 + Math.cos(driftTime * 0.7) * (height * 0.05);

        // Wobble radius (Centered)
        const rx = isMobile ? width * 0.2 : width * 0.25;
        const ry = isMobile ? height * 0.1 : height * 0.15;

        const targetX = centerX + Math.cos(time * 0.8) * rx;
        const targetY = centerY + Math.sin(time * 1.3) * ry;

        // Tilt Physics (pitch & roll)
        const tiltRoll = Math.cos(time * 0.8) * 10;
        const tiltPitch = Math.sin(time * 1.3) * 10;

        drone.style.left = `0px`;
        drone.style.top = `0px`;
        drone.style.transform = `translate3d(${targetX - 110}px, ${targetY - 110}px, 0) rotateX(${tiltPitch}deg) rotateY(${tiltRoll}deg)`;

        requestAnimationFrame(animate);
    };

    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initDroneSystem();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
