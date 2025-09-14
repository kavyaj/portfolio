// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Letter Explosion Animation - Enhanced Bettina Sosa Style
function initLetterExplosion() {
    const lines = [
        'From concept to creation.'
    ];

    const container = document.querySelector('.letter-explosion-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create word elements (keeping words together as cohesive units)
    lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('letter-line');

        const words = line.split(' ');
        words.forEach((word, wordIndex) => {
            // Create word container to keep letters together
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word-container');
            wordDiv.style.display = 'inline-block';
            wordDiv.style.marginRight = '1.5em'; // Even more word separation
            
            // Assign same speed to all letters in a word for cohesion
            const wordSpeed = (0.3 + Math.random() * 0.8).toString(); // Less extreme variation
            
            // Create letters for each word
            word.split('').forEach((char, charIndex) => {
                const letterDiv = document.createElement('div');
                letterDiv.classList.add('letter');
                letterDiv.style.display = 'inline-block';
                letterDiv.textContent = char;
                letterDiv.dataset.speed = wordSpeed; // Same speed for word cohesion
                letterDiv.dataset.word = word;
                letterDiv.dataset.line = lineIndex.toString();
                letterDiv.dataset.wordIndex = wordIndex.toString();
                wordDiv.appendChild(letterDiv);
            });
            
            lineDiv.appendChild(wordDiv);
        });

        container.appendChild(lineDiv);
    });

    // Ultra dramatic scroll-based animation with extreme movement
    const letters = container.querySelectorAll('.letter');

    letters.forEach((letter, index) => {
        const speed = parseFloat(letter.dataset.speed || '1');
        const isMobile = window.innerWidth <= 768; // Define mobile check first
        const randomRotation = Math.random() * 180 - 90; // Reduced rotation range
        const randomX = (Math.random() - 0.5) * (isMobile ? 150 : 600); // Much less scatter on mobile

        // Some letters fly UP, some fly DOWN - but less intense
        const direction = Math.random() > 0.5 ? 1 : -1; // 50/50 split
        const randomY = direction * Math.random() * window.innerHeight * (isMobile ? 0.3 : 1.0); // Much gentler on mobile

        // Create dramatic timeline for each letter
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: () => window.innerHeight * 1.5, // Much shorter scroll space
                scrub: 1, // Smoother scrub for dramatic effect
                invalidateOnRefresh: true
            }
        });

        tl.to(letter, {
            y: randomY + (direction * speed * window.innerHeight * (isMobile ? 0.4 : 0.8)), // Much gentler movement on mobile
            x: randomX * (0.5 + speed * 0.8), // Reduced horizontal scatter
            rotation: randomRotation + (speed * 90), // Less rotation
            scale: Math.max(0.3, 1.2 - (speed * 0.6)), // Gentler scaling
            opacity: Math.max(0.4, 1 - (speed * 0.5)), // Keep more visible
            ease: 'none'
        });

        // Add secondary animation for extra chaos - 3D rotation
        gsap.to(letter, {
            rotationX: (Math.random() - 0.5) * 60, // Gentler 3D rotation
            rotationY: (Math.random() - 0.5) * 60,
            z: Math.random() * 200 - 100, // Add depth variation
            scrollTrigger: {
                trigger: document.documentElement,
                start: () => window.innerHeight * 0.3,
                end: () => window.innerHeight * 1.3,
                scrub: 2,
                invalidateOnRefresh: true
            }
        });
    });


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

// Header visibility control - show only after hero section
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    const aboutSection = document.querySelector('#about');
    if (!header || !aboutSection) return;

    // Create scroll trigger to show header when about section comes into view
    ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 80%',
        end: 'bottom top',
        onEnter: () => {
            header.classList.add('visible');
        },
        onLeave: () => {
            header.classList.remove('visible');
        },
        onEnterBack: () => {
            header.classList.add('visible');
        },
        onLeaveBack: () => {
            header.classList.remove('visible');
        }
    });

    // Additional background color change on further scroll
    ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 60px',
        onEnter: () => {
            if (header.classList.contains('visible')) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        },
        onLeaveBack: () => {
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