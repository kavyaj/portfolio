// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Letter Explosion Animation - Enhanced Bettina Sosa Style
function initLetterExplosion() {
    const lines = [
        'Building is my craft',
        'storytelling is my passion'
    ];
    
    const container = document.querySelector('.letter-explosion-container');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create letter elements
    lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('letter-line');
        
        const words = line.split(' ');
        words.forEach((word, wordIndex) => {
            // Create letters for each word
            word.split('').forEach((char, charIndex) => {
                const letterDiv = document.createElement('div');
                letterDiv.classList.add('letter');
                letterDiv.textContent = char;
                // Extreme speed variation for chaos
                letterDiv.dataset.speed = (0.1 + Math.random() * 1.8).toString();
                letterDiv.dataset.word = word;
                letterDiv.dataset.line = lineIndex.toString();
                lineDiv.appendChild(letterDiv);
            });
            
            // Add space between words
            if (wordIndex < words.length - 1) {
                const spaceDiv = document.createElement('div');
                spaceDiv.classList.add('letter', 'space');
                spaceDiv.innerHTML = '&nbsp;';
                spaceDiv.dataset.speed = (0.1 + Math.random() * 1.8).toString();
                lineDiv.appendChild(spaceDiv);
            }
        });
        
        container.appendChild(lineDiv);
    });
    
    // Ultra dramatic scroll-based animation with extreme movement
    const letters = container.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        const speed = parseFloat(letter.dataset.speed || '1');
        const randomRotation = Math.random() * 360 - 180; // Full rotation range
        const randomX = (Math.random() - 0.5) * 1200; // Ultra wide horizontal scatter
        const randomY = Math.random() * window.innerHeight * 4; // Letters can flow to the very bottom
        
        // Create dramatic timeline for each letter
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: () => window.innerHeight * 4, // Extended to full section height
                scrub: 1, // Smoother scrub for dramatic effect
                invalidateOnRefresh: true
            }
        });
        
        tl.to(letter, {
            y: randomY + (speed * window.innerHeight * 3.5), // Letters flow all the way to section end
            x: randomX * (0.3 + speed * 1.2), // More extreme horizontal scatter
            rotation: randomRotation + (speed * 270), // Even more rotation
            scale: Math.max(0.05, 1.3 - (speed * 1.1)), // More dramatic scaling range
            opacity: Math.max(0.02, 1 - (speed * 0.9)), // Almost invisible for fastest letters
            ease: 'none'
        });
        
        // Add secondary animation for extra chaos
        gsap.to(letter, {
            rotationX: Math.random() * 90 - 45,
            rotationY: Math.random() * 90 - 45,
            scrollTrigger: {
                trigger: document.documentElement,
                start: () => window.innerHeight * 0.5,
                end: () => window.innerHeight * 3.5,
                scrub: 2,
                invalidateOnRefresh: true
            }
        });
    });
    
    // Enhanced fade-in of hero info section after dramatic letter explosion
    gsap.timeline({
        scrollTrigger: {
            trigger: '.hero-section',
            start: () => window.innerHeight * 2,
            end: () => window.innerHeight * 3.5,
            scrub: 2,
            invalidateOnRefresh: true
        }
    })
    .to('.hero-info', {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: 'power2.out'
    }, 1);
}

// Load blog posts for the writing section
async function loadWritingPosts() {
    try {
        const response = await fetch('/api/blog/posts');
        const posts = await response.json();
        
        const writingGrid = document.getElementById('writing-grid');
        
        if (posts.length === 0) {
            writingGrid.innerHTML = `
                <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
                    <p>No posts yet. Check back soon!</p>
                </div>
            `;
            return;
        }

        // Show only the latest 5 posts on the homepage
        const latestPosts = posts.slice(0, 5);
        
        writingGrid.innerHTML = latestPosts.map(post => `
            <article class="writing-item" onclick="window.open('/post.html?slug=${post.slug}', '_blank')">
                <h3 class="writing-title">${post.title}</h3>
                <div class="writing-meta">
                    <span class="writing-date">${new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}</span>
                    <span class="writing-category">BLOG</span>
                </div>
            </article>
        `).join('');
        
        // Add click handlers for new items
        const writingItems = document.querySelectorAll('.writing-item');
        writingItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('writing-grid').innerHTML = `
            <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
                <p>Error loading posts. Please try again later.</p>
            </div>
        `;
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize letter explosion animation
    initLetterExplosion();
    
    // Load blog posts when page loads
    loadWritingPosts();
    
    // Initialize other functionality
    toggleMobileMenu();
    initSmoothScrolling();
    initHeaderScrollEffect();
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});