// Kavya.wiki Portfolio - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initProgressBars();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
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