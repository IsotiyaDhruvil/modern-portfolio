// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const preloader = document.getElementById('preloader');
const themeToggle = document.getElementById('theme-toggle');
const dynamicText = document.querySelector('.dynamic-text');
const yearSpan = document.getElementById('year');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const scrollTopBtn = document.getElementById('scroll-top');

// Preloader
window.addEventListener('load', () => {
    const hidePreloader = () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
                initAnimations(); // Start animations after load
            }
        });
    };

    hidePreloader();
});

// Fallback to hide preloader if load event fails or takes too long
setTimeout(() => {
    if (preloader.style.display !== 'none') {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = 'none';
                initAnimations();
            }
        });
    }
}, 3000);

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hover effects for cursor
const links = document.querySelectorAll('a, button, .cursor-hover');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.borderColor = 'transparent';
        cursorFollower.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// Typing Animation
const roles = ["MERN Stack Developer", "Creative Frontend Devloper", "Backend Devloper"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
typeEffect();

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Footer Year
yearSpan.textContent = new Date().getFullYear();

// Theme Switcher (Basic Implementation)
const themes = [
    { primary: '#00A8FF', secondary: '#6E44FF' }, // Default
    { primary: '#FF007F', secondary: '#FF8C00' }, // Pink/Orange
    { primary: '#00F0FF', secondary: '#00FF7F' }, // Aqua/Green
];
let currentTheme = 0;

themeToggle.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];

    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
});

// GSAP Animations Initialization
function initAnimations() {
    // Hero Animations
    gsap.from('.hero-name', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-bio', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-btns', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.social-links', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out'
    });
}

// Counter Animation
const statsSection = document.querySelector('.about-stats');
const statNumbers = document.querySelectorAll('.stat-number');
let started = false; // Function started ? No

function startCount(el) {
    let goal = el.dataset.target;
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == goal) {
            clearInterval(count);
        }
    }, 2000 / goal);
}

if (statsSection) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= statsSection.offsetTop - 500) {
            if (!started) {
                statNumbers.forEach((num) => startCount(num));
            }
            started = true;
        }
    });
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// GSAP Scroll Animations for Sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
});
