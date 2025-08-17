// Kavya.wiki Portfolio - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initProgressBars();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initLetterExplosion();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate progress bars when they come into view
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    let hasAnimated = false;
    
    function animateProgressBars() {
        if (hasAnimated) return;
        
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
        
        if (isVisible) {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    // Reset width first
                    bar.style.width = '0%';
                    
                    // Animate to target width with delay
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                }
            });
            hasAnimated = true;
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
    
    // Check on load
    animateProgressBars();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'SENDING...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! This is a demo - in a real implementation, this would send your message.');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// Scroll animations for elements coming into view
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .education-item, .writing-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide elements and observe them
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add click handlers for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const projectTitles = ['Logo Design', 'Career Story', 'The Brave Rocketeers', 'Resumey.Pro'];
            const projectTitle = projectTitles[index] || 'Project';
            
            // In a real implementation, this would navigate to project detail pages
            console.log(`Clicked on ${projectTitle} project`);
        });
    });
});

// Add click handlers for writing items
document.addEventListener('DOMContentLoaded', function() {
    const writingItems = document.querySelectorAll('.writing-item');
    
    writingItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.writing-title').textContent;
            
            // In a real implementation, this would navigate to blog post pages
            console.log(`Clicked on article: ${title}`);
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing animation for hero tagline
function initTypingAnimation() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid #000';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    setTimeout(initTypingAnimation, 500);
});

// Add smooth reveal animation for statistics
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    let hasTriggered = false;
    
    function animateStats() {
        if (hasTriggered) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            stats.forEach(stat => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (isNaN(numericValue)) return;
                
                let currentValue = 0;
                const increment = numericValue / 60; // 60 frames for smooth animation
                const suffix = finalValue.replace(/\d/g, '');
                
                stat.textContent = '0' + suffix;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        stat.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 16); // ~60fps
            });
            hasTriggered = true;
        }
    }
    
    window.addEventListener('scroll', animateStats);
}

// Initialize stats animation
initStatsAnimation();

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length) {
        if (konamiCode.every((code, index) => code === konamiSequence[index])) {
            // Easter egg triggered
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Letter Explosion Animation - Vanilla JS Implementation
function initLetterExplosion() {
    const titleElement = document.getElementById('hero-animated-text');
    if (!titleElement) return;
    
    // Split words into individual letters
    const words = titleElement.querySelectorAll('.letter-word');
    
    words.forEach(wordElement => {
        const text = wordElement.getAttribute('data-word');
        wordElement.innerHTML = '';
        
        // Create individual letter spans
        text.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter === ' ' ? '\u00A0' : letter;
            letterSpan.className = 'letter';
            
            // Add random rotation for animation
            const randomRotation = (Math.random() - 0.5) * 60; // ±30 degrees
            letterSpan.style.setProperty('--random-rotation', `${randomRotation}deg`);
            
            // Add random values for scroll animation
            const randomSpeed = 0.8 + Math.random() * 0.7; // 0.8 to 1.5
            const randomScrollRotation = (Math.random() - 0.5) * 30; // ±15 degrees
            letterSpan.setAttribute('data-speed', randomSpeed);
            letterSpan.setAttribute('data-scroll-rotation', randomScrollRotation);
            
            wordElement.appendChild(letterSpan);
        });
    });
    
    // Trigger entrance animation
    setTimeout(() => {
        animateLettersIn();
    }, 800);
}

function animateLettersIn() {
    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('animate-in');
        }, index * 120); // Stagger the animation
    });
}

function animateLettersOnScroll(scrollY) {
    const letters = document.querySelectorAll('.letter');
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;
    
    const heroRect = heroSection.getBoundingClientRect();
    const heroVisible = heroRect.bottom > 0 && heroRect.top < windowHeight;
    
    // Calculate scroll progress based on hero section visibility
    const scrollProgress = Math.max(0, Math.min(1, (windowHeight - heroRect.top) / (windowHeight + heroRect.height)));
    
    letters.forEach((letter, index) => {
        const speed = parseFloat(letter.getAttribute('data-speed') || '1');
        const scrollRotation = parseFloat(letter.getAttribute('data-scroll-rotation') || '0');
        
        if (heroVisible) {
            // Continuous animation based on scroll position
            const intensity = Math.sin(scrollProgress * Math.PI); // Creates wave-like intensity
            const baseRotation = scrollRotation * scrollProgress * 2; // More dramatic rotation
            const randomOffset = Math.sin((scrollY * 0.01) + (index * 0.5)) * 20; // Continuous floating
            
            // Calculate transform values with continuous movement
            const driftY = ((1 - speed) * scrollProgress * 300) + randomOffset; // More dramatic drift + floating
            const rotation = baseRotation + (Math.sin(scrollY * 0.005 + index) * 15); // Continuous rotation
            const scale = 0.9 + (intensity * 0.3); // Pulsing scale effect
            const opacity = Math.max(0.4, 1 - (scrollProgress * 0.6)); // Better visibility
            
            // Add wave-like horizontal movement
            const waveX = Math.sin((scrollY * 0.008) + (index * 0.3)) * 30 * intensity;
            
            // Apply transforms with continuous animation
            letter.style.setProperty('--scroll-y', `${driftY}px`);
            letter.style.setProperty('--scroll-x', `${waveX}px`);
            letter.style.setProperty('--rotation', `${rotation}deg`);
            letter.style.setProperty('--opacity', opacity);
            letter.style.setProperty('--scale', scale);
            
            letter.classList.add('animate-scroll');
        } else {
            // Reset when hero is out of view
            letter.style.setProperty('--scroll-y', '0px');
            letter.style.setProperty('--scroll-x', '0px');
            letter.style.setProperty('--rotation', '0deg');
            letter.style.setProperty('--opacity', '1');
            letter.style.setProperty('--scale', '1');
        }
    });
}

// Enhanced scroll listener for continuous letter animation
let ticking = false;

function updateLetterAnimation() {
    const scrolled = window.pageYOffset;
    animateLettersOnScroll(scrolled);
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateLetterAnimation);
        ticking = true;
    }
});

// Also trigger animation on resize
window.addEventListener('resize', function() {
    const scrolled = window.pageYOffset;
    animateLettersOnScroll(scrolled);
});