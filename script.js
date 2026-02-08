// XRANS PORTFOLIO - ELITE EDITION
// Smooth animations + Loading screen

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 XRANS Elite Portfolio Loading...');
    
    // ==================== LOADING SYSTEM ====================
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const progressFill = document.querySelector('.progress-fill');
    const loadingStatus = document.querySelector('.loading-status');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        // Update status text
        if (progress < 30) {
            loadingStatus.textContent = 'INITIALIZING SYSTEM...';
        } else if (progress < 60) {
            loadingStatus.textContent = 'LOADING ASSETS...';
        } else if (progress < 90) {
            loadingStatus.textContent = 'ACTIVATING ELITE MODE...';
        } else {
            loadingStatus.textContent = 'READY TO LAUNCH...';
        }
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.8s ease';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.opacity = '1';
                    mainContent.style.transition = 'opacity 0.8s ease';
                    
                    // Initialize portfolio
                    initPortfolio();
                }, 800);
            }, 500);
        }
    }, 100);
    
    // ==================== PORTFOLIO INITIALIZATION ====================
    function initPortfolio() {
        console.log('🎯 Portfolio Initialized');
        
        // Initialize time display
        updateTime();
        setInterval(updateTime, 60000);
        
        // Initialize menu system
        initMenuSystem();
        
        // Initialize animations
        initAnimations();
        
        // Initialize scroll handling
        initScrollSystem();
        
        // Add entrance animations
        setTimeout(() => {
            document.querySelectorAll('.animate__animated').forEach(el => {
                el.style.opacity = '1';
            });
        }, 300);
    }
    
    // ==================== TIME DISPLAY ====================
    function updateTime() {
        const now = new Date();
        const timeDisplay = document.getElementById('currentTime');
        if (timeDisplay) {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeDisplay.textContent = `${hours}:${minutes}`;
        }
    }
    
    // ==================== MENU SYSTEM ====================
    function initMenuSystem() {
        const menuButtons = document.querySelectorAll('.menu-btn');
        const contentPanels = document.querySelectorAll('.content-panel');
        
        // Set first panel active
        const firstPanel = document.getElementById('intro');
        if (firstPanel) {
            firstPanel.style.display = 'block';
        }
        
        // Add click events to menu buttons
        menuButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('data-target');
                if (!targetId) return;
                
                // Remove active class from all buttons
                menuButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('animate__pulse');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.classList.add('animate__pulse');
                
                // Remove pulse animation after 1s
                setTimeout(() => {
                    this.classList.remove('animate__pulse');
                }, 1000);
                
                // Switch panel
                switchPanel(targetId);
                
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
        
        // Panel switching function
        function switchPanel(panelId) {
            // Hide all panels
            contentPanels.forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
                panel.classList.remove('animate__fadeInRight');
            });
            
            // Show target panel
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                
                // Add animation
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    targetPanel.classList.add('animate__fadeInRight');
                    
                    // Scroll to top
                    targetPanel.scrollTop = 0;
                }, 10);
            }
            
            // Update URL hash
            window.location.hash = panelId;
        }
        
        // Check URL hash on load
        const hash = window.location.hash.substring(1);
        const validPanels = ['intro', 'quotes', 'philosophy', 'contact'];
        if (hash && validPanels.includes(hash)) {
            setTimeout(() => {
                const targetButton = document.querySelector(`[data-target="${hash}"]`);
                if (targetButton) {
                    targetButton.click();
                }
            }, 300);
        }
    }
    
    // ==================== ANIMATIONS SYSTEM ====================
    function initAnimations() {
        // Add hover animations to interactive elements
        const interactiveElements = document.querySelectorAll(
            '.skill-card, .quote-item, .contact-item, .principle-card, .stat-item'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated');
                    
                    // Different animations based on element
                    if (entry.target.classList.contains('skill-card')) {
                        entry.target.classList.add('animate__fadeInUp');
                    } else if (entry.target.classList.contains('quote-item')) {
                        entry.target.classList.add('animate__fadeIn');
                    } else if (entry.target.classList.contains('contact-item')) {
                        entry.target.classList.add('animate__fadeInLeft');
                    }
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        document.querySelectorAll('.skill-card, .quote-item, .contact-item, .principle-card').forEach(el => {
            observer.observe(el);
        });
        
        // Floating elements animation
        const floatElements = document.querySelectorAll('.float-el');
        floatElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 5}s`;
        });
    }
    
    // ==================== SCROLL SYSTEM ====================
    function initScrollSystem() {
        const panels = document.querySelectorAll('.content-panel');
        
        panels.forEach(panel => {
            // Smooth scroll behavior
            panel.addEventListener('wheel', function(e) {
                // Normal scroll behavior
            }, { passive: true });
            
            // Save scroll position
            panel.addEventListener('scroll', function() {
                localStorage.setItem(`scroll_${this.id}`, this.scrollTop);
            });
            
            // Restore scroll position when panel becomes active
            const panelObserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class' && panel.classList.contains('active')) {
                        setTimeout(() => {
                            const savedScroll = localStorage.getItem(`scroll_${panel.id}`);
                            if (savedScroll) {
                                panel.scrollTop = parseInt(savedScroll);
                            }
                        }, 50);
                    }
                });
            });
            
            panelObserver.observe(panel, { attributes: true });
        });
    }
    
    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.menu-btn.active');
        const buttons = Array.from(document.querySelectorAll('.menu-btn'));
        const currentIndex = buttons.indexOf(activeButton);
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % buttons.length;
            if (buttons[nextIndex]) {
                buttons[nextIndex].click();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            if (buttons[prevIndex]) {
                buttons[prevIndex].click();
            }
        } else if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            if (buttons[index]) {
                buttons[index].click();
            }
        }
    });
    
    // ==================== TOUCH SWIPE NAVIGATION ====================
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only consider horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const activeButton = document.querySelector('.menu-btn.active');
            const buttons = Array.from(document.querySelectorAll('.menu-btn'));
            const currentIndex = buttons.indexOf(activeButton);
            
            if (diffX > 0) {
                // Swipe left - next
                const nextIndex = (currentIndex + 1) % buttons.length;
                if (buttons[nextIndex]) {
                    buttons[nextIndex].click();
                }
            } else {
                // Swipe right - previous
                const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                if (buttons[prevIndex]) {
                    buttons[prevIndex].click();
                }
            }
        }
    }, { passive: true });
    
    // ==================== PERFORMANCE OPTIMIZATIONS ====================
    // Reduce animations on low-end devices
    const isLowEnd = /android.*(p35|mt67|helio|snapdragon[ _-]*[234])/i.test(navigator.userAgent);
    
    if (isLowEnd) {
        console.log('⚡ Low-end device detected - Optimizing animations');
        
        // Reduce animation complexity
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.3s';
        });
        
        // Simplify floating elements
        document.querySelectorAll('.float-el').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '0.05';
        });
        
        // Reduce blur effects
        document.querySelectorAll('*').forEach(el => {
            if (el.style.backdropFilter) {
                el.style.backdropFilter = 'none';
            }
        });
    }
    
    // ==================== CLEANUP ====================
    window.addEventListener('beforeunload', function() {
        // Clear scroll positions
        document.querySelectorAll('.content-panel').forEach(panel => {
            localStorage.removeItem(`scroll_${panel.id}`);
        });
    });
    
    // Initialization complete
    console.log('✨ XRANS Elite Portfolio Ready');
    console.log('🎨 Design: iPhone Style + Elite Black/White');
    console.log('⚡ Animations: Smooth & Fresh');
    console.log('📱 Menu: Horizontal 2x2 Layout');
});