document.addEventListener('DOMContentLoaded', function() {
    // Simple gallery functionality
    initGallery();
    
    // Rest of the functionality...
    initSmoothScrolling();
    initScrollAnimations();
    initParallax();
    initYearUpdate();
    initScrollNav();
    initScrollHint();
    initSectionDividers();
    initBackToTop();
    initPersonalInfoEffects();
    initFixedHeader();
});

// Gallery functionality - Simple and reliable
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const fullscreenGallery = document.querySelector('.gallery-fullscreen');
    const fullscreenImg = fullscreenGallery?.querySelector('img');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const galleryCounter = document.querySelector('.gallery-counter');
    let currentIndex = 0;
    let galleryImages = [];
    
    // For touch events
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (!galleryItems.length || !fullscreenGallery || !fullscreenImg) return;
    
    // Build gallery image array
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt') || ''
            });
        }
    });
    
    // Click events for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openGallery(index);
        });
    });
    
    // Open gallery
    function openGallery(index) {
        currentIndex = index;
        updateGalleryContent();
        fullscreenGallery.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update gallery content
    function updateGalleryContent() {
        if (galleryImages[currentIndex]) {
            fullscreenImg.setAttribute('src', galleryImages[currentIndex].src);
            fullscreenImg.setAttribute('alt', galleryImages[currentIndex].alt);
            
            if (galleryCounter) {
                galleryCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
            }
        }
    }
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            showPrevious();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            showNext();
        });
    }
    
    // Show previous image
    function showPrevious() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGalleryContent();
    }
    
    // Show next image
    function showNext() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateGalleryContent();
    }
    
    // Close gallery
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeGallery();
        });
    }
    
    function closeGallery() {
        fullscreenGallery.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (fullscreenGallery.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowLeft') {
                showPrevious();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        }
    });
    
    // Touch swipe support for mobile
    if (fullscreenGallery) {
        // Touch start event
        fullscreenGallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        // Touch end event
        fullscreenGallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        // Handle swipe direction
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left (next image)
                showNext();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right (previous image)
                showPrevious();
            }
        }
    }
    
    // Close on click outside
    fullscreenGallery.addEventListener('click', function(e) {
        if (e.target === fullscreenGallery) {
            closeGallery();
        }
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('gallery-container')) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 150 * index);
                    });
                }
                
                if (entry.target.classList.contains('achievements')) {
                    const cards = entry.target.querySelectorAll('.achievement-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('card-visible');
                        }, 150 * index);
                    });
                }
                
                if (entry.target.classList.contains('info-grid')) {
                    const items = entry.target.querySelectorAll('.info-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('item-visible');
                            
                            // Animate the footer with a further delay
                            const footer = item.querySelector('.info-footer');
                            if (footer) {
                                setTimeout(() => {
                                    footer.style.opacity = '1';
                                }, 400);
                            }
                        }, 130 * index);
                    });
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('section, .gallery-container, .achievements, .info-grid').forEach(section => {
        animateOnScroll.observe(section);
        if (section.tagName === 'SECTION') {
            section.classList.add('animate');
        }
    });
}

// Parallax effect
function initParallax() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (header && header.style) {
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
}

// Update year
function initYearUpdate() {
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Nav highlighting on scroll
function initScrollNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust the offset to trigger a little earlier
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll hint
function initScrollHint() {
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollHint.style.opacity = '0';
            } else {
                scrollHint.style.opacity = '0.8';
            }
        });
    }
}

// Section dividers animation
function initSectionDividers() {
    const sectionDividers = document.querySelectorAll('.section-divider');
    if (sectionDividers.length > 0) {
        const animateDividers = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.5
        });

        sectionDividers.forEach(divider => {
            divider.style.opacity = '0';
            divider.style.transform = 'translateY(20px)';
            divider.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            animateDividers.observe(divider);
        });
    }
}

// Back to top
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top a');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Enhanced personal info interactive effects
function initPersonalInfoEffects() {
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach(item => {
        // Add subtle mouse movement effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25; // Limit rotation to small amount
            const rotateY = (centerX - x) / 25;
            
            // Apply transformation - subtle 3D effect
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        // Reset on mouse leave
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            setTimeout(() => {
                if (!this.matches(':hover')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            }, 100);
        });
    });
}

// Sticky header functionality
function initFixedHeader() {
    const navContainer = document.querySelector('.nav-container');
    const headerHeight = 100; // Approximate height threshold to trigger sticky header
    
    if (navContainer) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > headerHeight) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
        });
    }
    
    // Add active class to current section in navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu when a link is clicked
            const mobileMenu = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.nav-links');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            this.classList.toggle('open');
            
            // Toggle body scroll when menu is open
            if (mobileMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
} 