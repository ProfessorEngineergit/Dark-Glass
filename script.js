// Dark Glass Design System - JavaScript

// ====================================
// Terminal Loading Screen
// ====================================
const terminalLines = [
    '> Initializing Dark Glass Design System...',
    '> Loading cosmic aesthetics...',
    '> Applying glassmorphism effects...',
    '> Activating backdrop filters...',
    '> Configuring interactive elements...',
    '> System ready. Welcome to the future.'
];

function typeTerminalLine(text, lineElement, delay = 30) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                lineElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(resolve, 200);
            }
        }, delay);
    });
}

async function runTerminalSequence() {
    const terminal = document.querySelector('.terminal-loading');
    const linesContainer = document.getElementById('terminal-lines');
    
    if (!terminal || !linesContainer) return;
    
    for (let i = 0; i < terminalLines.length; i++) {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        linesContainer.appendChild(lineElement);
        
        await typeTerminalLine(terminalLines[i], lineElement);
    }
    
    // Add cursor
    const cursorElement = document.createElement('span');
    cursorElement.className = 'terminal-cursor';
    linesContainer.appendChild(cursorElement);
    
    // Hide terminal after delay
    setTimeout(() => {
        terminal.classList.add('hidden');
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 500);
    }, 1000);
}

// ====================================
// Glitch Text Effect
// ====================================
class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    
    scramble(iterations = 20) {
        let iteration = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            iteration += 1 / 3;
            
            if (iteration >= this.originalText.length) {
                clearInterval(interval);
                this.element.textContent = this.originalText;
            }
        }, 50);
    }
}

function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.scramble-text');
    
    glitchElements.forEach((element, index) => {
        const glitch = new GlitchText(element);
        
        // Initial scramble with delay
        setTimeout(() => {
            glitch.scramble();
        }, index * 200);
        
        // Scramble on hover
        element.addEventListener('mouseenter', () => {
            glitch.scramble();
        });
    });
}

// ====================================
// Draggable Glass Panels
// ====================================
class DraggablePanel {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousedown', (e) => this.dragStart(e));
        this.element.addEventListener('touchstart', (e) => this.dragStart(e));
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        
        document.addEventListener('mouseup', (e) => this.dragEnd(e));
        document.addEventListener('touchend', (e) => this.dragEnd(e));
    }
    
    dragStart(e) {
        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
        
        if (e.target === this.element || this.element.contains(e.target)) {
            this.isDragging = true;
            this.element.classList.add('dragging');
            this.element.classList.add('active');
        }
    }
    
    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }
            
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            
            this.setTranslate(this.currentX, this.currentY);
        }
    }
    
    dragEnd(e) {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.isDragging = false;
        
        this.element.classList.remove('dragging');
        
        // Remove active class after a delay
        setTimeout(() => {
            this.element.classList.remove('active');
        }, 300);
    }
    
    setTranslate(xPos, yPos) {
        this.element.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

function initDraggablePanels() {
    const panels = document.querySelectorAll('.draggable-panel');
    panels.forEach(panel => {
        new DraggablePanel(panel);
    });
}

// ====================================
// Button Interactions
// ====================================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.glass-button');
    
    buttons.forEach(button => {
        // Click animation
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ====================================
// Random Panel Positioning
// ====================================
function randomizePanelPositions() {
    const panels = document.querySelectorAll('.draggable-panel');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    panels.forEach((panel, index) => {
        const panelWidth = panel.offsetWidth;
        const panelHeight = panel.offsetHeight;
        
        // Calculate safe random positions (avoiding edges)
        const margin = 50;
        const maxX = windowWidth - panelWidth - margin;
        const maxY = windowHeight - panelHeight - margin;
        
        let x, y;
        
        // Different positioning strategies for different panels
        switch(index) {
            case 0:
                x = margin + 50;
                y = windowHeight * 0.15;
                break;
            case 1:
                x = windowWidth - panelWidth - margin - 50;
                y = windowHeight * 0.25;
                break;
            case 2:
                x = margin + 50;
                y = windowHeight * 0.55;
                break;
            case 3:
                x = windowWidth - panelWidth - margin - 50;
                y = windowHeight * 0.65;
                break;
            default:
                x = Math.random() * maxX + margin;
                y = Math.random() * maxY + margin;
        }
        
        panel.style.left = x + 'px';
        panel.style.top = y + 'px';
        
        // Add entrance animation
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1)';
        }, index * 150);
    });
}

// ====================================
// Smooth Scroll
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ====================================
// Initialize on DOM Load
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    // Run terminal loading sequence
    runTerminalSequence();
    
    // Initialize glitch effects after terminal
    setTimeout(() => {
        initGlitchEffects();
    }, 4000);
    
    // Initialize draggable panels
    setTimeout(() => {
        initDraggablePanels();
        randomizePanelPositions();
    }, 4500);
    
    // Initialize button effects
    initButtonEffects();
    
    // Initialize smooth scroll
    initSmoothScroll();
});

// ====================================
// Handle Window Resize
// ====================================
window.addEventListener('resize', () => {
    // Reposition panels on resize to keep them in view
    const panels = document.querySelectorAll('.draggable-panel');
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            randomizePanelPositions();
        }
    });
});
