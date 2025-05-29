// === MOBILE MENU === 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
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

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// === FORM HANDLING ===
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div> Відправляємо...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            alert('Дякуємо за заявку! Наш тренер зв\'яжеться з вами найближчим часом.');
            
            // Reset form
            this.reset();
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            console.log('Form data:', data);
        }, 2000);
    });
}

// === FORM VALIDATION ===
function validateForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        const phoneRegex = /^\+380\d{9}$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            phoneInput.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    // Email validation (if provided)
    const emailInput = document.getElementById('email');
    if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    return isValid;
}

// Real-time validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#e2e8f0';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = '#e2e8f0';
        }
    });
});

// === SCROLL ANIMATIONS ===
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .technique-card, .trainer-card, .benefit-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.stat-card, .technique-card, .trainer-card, .benefit-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// === COUNTER ANIMATION ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .stat-big, .counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
        if (!target) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// === PROGRESS BARS ANIMATION ===
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.difficulty-level, .usage-level, .progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.getPropertyValue('--progress') || bar.style.width;
        if (bar.style.getPropertyValue('--progress')) {
            bar.style.setProperty('--progress', '0%');
            setTimeout(() => {
                bar.style.setProperty('--progress', width);
            }, 100);
        } else {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

// === ABOUT SECTION INTERACTIVE FEATURES ===

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations based on section
            if (entry.target.classList.contains('stats-container')) {
                setTimeout(animateCounters, 500);
                setTimeout(animateProgressBars, 800);
            }
            
            if (entry.target.classList.contains('about-text')) {
                setTimeout(() => {
                    const animatedText = entry.target.querySelector('.animated-text');
                    if (animatedText) {
                        animatedText.classList.add('fade-in');
                    }
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe about section elements
document.addEventListener('DOMContentLoaded', () => {
    const aboutElements = document.querySelectorAll('.about-text, .stats-container, .participants-map');
    aboutElements.forEach(el => {
        if (el) sectionObserver.observe(el);
    });
});

// === STATS TOGGLE FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            // Update active button
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide stats grids
            document.querySelectorAll('.stats-grid').forEach(grid => {
                grid.classList.add('hidden');
            });
            
            const targetGrid = document.getElementById(view + '-stats');
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
                
                // Restart counter animation
                setTimeout(() => {
                    const counters = targetGrid.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (!target) return;
                        
                        let current = 0;
                        const increment = target / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                counter.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                counter.textContent = Math.floor(current);
                            }
                        }, 20);
                    });
                }, 100);
            }
        });
    });
});

// === EXPANDABLE INFO FUNCTIONALITY ===
function toggleInfo() {
    const expandable = document.querySelector('.expandable-info');
    const fullInfo = document.querySelector('.info-full');
    const btn = document.querySelector('.expand-btn');
    
    if (!expandable || !fullInfo || !btn) return;
    
    const arrow = btn.querySelector('.btn-arrow');
    const btnText = btn.querySelector('.btn-text');
    
    if (fullInfo.classList.contains('hidden')) {
        fullInfo.classList.remove('hidden');
        expandable.classList.add('expanded');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
        if (btnText) btnText.textContent = 'Згорнути';
        
        // Animate feature list items
        const featureItems = fullInfo.querySelectorAll('.feature-list li');
        featureItems.forEach((item, index) => {
            item.style.setProperty('--delay', (index * 0.1) + 's');
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.5s ease var(--delay) both';
            }, 10);
        });
    } else {
        fullInfo.classList.add('hidden');
        expandable.classList.remove('expanded');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        if (btnText) btnText.textContent = 'Детальніше';
    }
}

// === INTERACTIVE TIMELINE ===
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update timeline progress
            const progress = ((index + 1) / timelineItems.length) * 100;
            const timelineProgress = document.querySelector('.timeline::before');
            if (timelineProgress) {
                timelineProgress.style.height = progress + '%';
            }
        });
    });
});

// === INTERACTIVE MAP FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', () => {
    const regionDots = document.querySelectorAll('.region-dot');
    const tooltip = document.querySelector('.map-tooltip');
    
    regionDots.forEach(dot => {
        dot.addEventListener('mouseenter', (e) => {
            if (!tooltip) return;
            
            const region = dot.getAttribute('data-region');
            const count = dot.getAttribute('data-count');
            
            tooltip.innerHTML = `<strong>${region}</strong><br>${count} учасників`;
            tooltip.classList.remove('hidden');
            
            const rect = dot.getBoundingClientRect();
            const mapRect = document.querySelector('.map-container').getBoundingClientRect();
            
            tooltip.style.left = (rect.left - mapRect.left + 20) + 'px';
            tooltip.style.top = (rect.top - mapRect.top - 40) + 'px';
        });
        
        dot.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.classList.add('hidden');
            }
        });
        
        // Click effect for mobile
        dot.addEventListener('click', () => {
            dot.style.transform = 'scale(1.8)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// === ENHANCED HOVER EFFECTS FOR STAT CARDS ===
document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate icon
            const icon = card.querySelector('.stat-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease';
            }
            
            // Restart progress bar animation
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                const currentWidth = progressBar.style.getPropertyValue('--progress');
                progressBar.style.setProperty('--progress', '0%');
                setTimeout(() => {
                    progressBar.style.setProperty('--progress', currentWidth);
                }, 50);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            const icon = card.querySelector('.stat-icon');
            if (icon) {
                icon.style.animation = 'none';
            }
        });
    });
});

// === PHONE NUMBER FORMATTING ===
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (!value.startsWith('380')) {
            if (value.startsWith('0')) {
                value = '380' + value.substring(1);
            } else if (value.length > 0) {
                value = '380' + value;
            }
        }
        
        if (value.length > 12) {
            value = value.substring(0, 12);
        }
        
        if (value.length > 0) {
            e.target.value = '+' + value;
        } else {
            e.target.value = '';
        }
    });
}

// === HAMBURGER ANIMATION ===
if (hamburger) {
    hamburger.addEventListener('click', function() {
        const spans = this.querySelectorAll('span');
        
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// === CLOSE MENU ON OUTSIDE CLICK ===
document.addEventListener('click', function(e) {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// === LOADING SCREEN (OPTIONAL) ===
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// === LEGACY OBSERVERS FOR HERO AND TECHNIQUE SECTIONS ===
// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroSection);
}

// Animate progress bars when technique section is visible
const techniqueSection = document.querySelector('.techniques-section');
if (techniqueSection) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    });
    
    progressObserver.observe(techniqueSection);
}

// === PERFORMANCE OPTIMIZATION ===
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(animateOnScroll, 100));

// === ACCESSIBILITY IMPROVEMENTS ===
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.stat-card, .timeline-item, .region-dot, .expand-btn');
    
    interactiveElements.forEach(element => {
        // Make elements focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .stat-card:focus,
        .timeline-item:focus,
        .region-dot:focus,
        .expand-btn:focus {
            outline: 2px solid #fbbf24;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.message);
    // Graceful degradation - ensure basic functionality still works
});

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Interactive About Section Loaded Successfully!');
    
    // Initialize all components
    if (typeof toggleInfo !== 'undefined') {
        window.toggleInfo = toggleInfo;
    }
    
    // Trigger initial animations
    setTimeout(() => {
        const aboutGrid = document.querySelector('.about-grid');
        if (aboutGrid && aboutGrid.getBoundingClientRect().top < window.innerHeight) {
            aboutGrid.classList.add('animate-in');
        }
    }, 500);
});