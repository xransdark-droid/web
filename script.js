// Real Visitor Tracking System
class VisitorTracker {
    constructor() {
        this.visitorCount = 0;
        this.readCount = 0;
        this.sessionId = this.generateSessionId();
        this.userData = null;
        
        this.init();
    }
    
    async init() {
        // Start loading screen timeout
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
        
        // Load existing data
        this.loadData();
        
        // Create aurora background
        this.createAuroraEffect();
        
        // Setup click animations
        this.setupClickAnimations();
        
        // Track user session
        this.trackSession();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    loadData() {
        // Get visitor count from localStorage
        let storedCount = localStorage.getItem('darkStoriesVisitors');
        let storedReads = localStorage.getItem('darkStoriesReads');
        
        if (!storedCount) {
            // Start from 1 for the first visitor
            this.visitorCount = 1;
        } else {
            this.visitorCount = parseInt(storedCount);
            
            // Only increment if it's a new session
            if (!localStorage.getItem('currentSession')) {
                this.visitorCount++;
            }
        }
        
        if (!storedReads) {
            this.readCount = 0;
        } else {
            this.readCount = parseInt(storedReads);
        }
        
        // Save current session
        localStorage.setItem('currentSession', this.sessionId);
        
        // Update display
        this.updateCounters();
        
        // Save updated data
        this.saveData();
    }
    
    updateCounters() {
        document.getElementById('visitorCount').textContent = this.visitorCount;
        document.getElementById('readCount').textContent = this.readCount;
    }
    
    saveData() {
        localStorage.setItem('darkStoriesVisitors', this.visitorCount);
        localStorage.setItem('darkStoriesReads', this.readCount);
    }
    
    incrementReadCount() {
        this.readCount++;
        this.updateCounters();
        this.saveData();
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
    
    createAuroraEffect() {
        const auroraBg = document.getElementById('auroraBg');
        
        // Create multiple aurora lines
        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'aurora-line';
            
            // Random size and position
            const width = Math.random() * 400 + 100;
            const height = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            line.style.width = `${width}px`;
            line.style.height = `${height}px`;
            line.style.left = `${left}%`;
            line.style.top = `${top}%`;
            
            // Random animation
            const duration = Math.random() * 30 + 20;
            const delay = Math.random() * 10;
            line.style.animationDuration = `${duration}s`;
            line.style.animationDelay = `${delay}s`;
            
            // Random color variation
            const hue = Math.random() * 10 + 350; // Red hue range
            line.style.background = `hsl(${hue}, 100%, 50%)`;
            
            auroraBg.appendChild(line);
        }
    }
    
    setupClickAnimations() {
        // Create ripple effect on click
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'click-ripple';
            
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            
            document.body.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add sound effect for major interactions
            if (e.target.id === 'readStoryBtn' || e.target.closest('#readStoryBtn')) {
                this.playClickSound();
            }
        });
    }
    
    playClickSound() {
        // Create a subtle click sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    trackSession() {
        // Track user activity
        let lastActivity = Date.now();
        
        // Update last activity on user interaction
        const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
        
        activityEvents.forEach(event => {
            document.addEventListener(event, () => {
                lastActivity = Date.now();
            });
        });
        
        // Check for inactivity every minute
        setInterval(() => {
            const now = Date.now();
            const inactiveTime = now - lastActivity;
            
            // If inactive for 5 minutes, consider session ended
            if (inactiveTime > 5 * 60 * 1000) {
                localStorage.removeItem('currentSession');
            }
        }, 60 * 1000);
    }
}

// Story Management
class StoryManager {
    constructor(tracker) {
        this.tracker = tracker;
        this.isStoryVisible = false;
        
        this.init();
    }
    
    init() {
        // Setup story button click
        const readBtn = document.getElementById('readStoryBtn');
        readBtn.addEventListener('click', () => this.showStory());
        
        // Setup back to top button
        const backToTop = document.getElementById('backToTop');
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Setup header hide/show on scroll
        this.setupScrollEffects();
        
        // Setup chapter reveal on scroll
        this.setupChapterReveal();
    }
    
    showStory() {
        if (!this.isStoryVisible) {
            const storyContainer = document.getElementById('storyContainer');
            const storySelection = document.getElementById('storySelection');
            const contactSection = document.getElementById('contactSection');
            
            // Animate story selection away
            storySelection.style.opacity = '0';
            storySelection.style.transform = 'translateY(-20px)';
            contactSection.style.opacity = '0';
            contactSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                storySelection.style.display = 'none';
                contactSection.style.display = 'none';
                
                // Show story container
                storyContainer.classList.add('show');
                
                // Scroll to story
                setTimeout(() => {
                    storyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                
                // Increment read count
                this.tracker.incrementReadCount();
                
                this.isStoryVisible = true;
            }, 500);
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    setupScrollEffects() {
        let lastScroll = 0;
        const header = document.getElementById('mainHeader');
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Show/hide header based on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            // Show back to top button
            if (currentScroll > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    setupChapterReveal() {
        const chapters = document.querySelectorAll('.chapter');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        chapters.forEach(chapter => {
            observer.observe(chapter);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize visitor tracker
    const tracker = new VisitorTracker();
    
    // Initialize story manager
    const storyManager = new StoryManager(tracker);
    
    // Add logo click effect
    const logo = document.getElementById('logoBrand');
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to story card
    const storyCard = document.getElementById('storyCard');
    storyCard.addEventListener('mouseenter', () => {
        storyCard.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    storyCard.addEventListener('mouseleave', () => {
        storyCard.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add hover effect to contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to title
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing after load
    setTimeout(typeWriter, 2200);
});