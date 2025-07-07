
// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});

// Scroll to demo
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
}

// Demo responses
const demoResponses = {
    'food': "You spent $287 on food last month. That breaks down to $156 on groceries and $131 on restaurants/delivery. Your 3-month average is $245, so you were a bit over.",
    'bills': "Your next bills are: Netflix ($15.99) on Thursday, Spotify ($9.99) on Friday, and your phone bill ($67) next Tuesday. Total coming up: $92.98.",
    'spend': "Based on your usual expenses and upcoming bills, you have about $340 you can safely spend this week without touching your emergency fund.",
    'save': "You're currently saving $180/month automatically. To reach your $5,000 emergency fund goal, you'd need to save $220/month. Want me to find an extra $40 in your budget?",
    'credit': "Your credit score is 748 (up 12 points from last month). Your on-time payments are helping a lot. Keep it up!",
    'default': "I can help with questions about your spending, upcoming bills, how much you can afford to spend, savings goals, or your credit score. What would you like to know?"
};

// Handle demo messages
function sendDemoMessage() {
    const input = document.getElementById('demo-input');
    const message = input.value.trim().toLowerCase();
    
    if (!message) return;

    // Add user message
    addDemoMessage(input.value, true);
    input.value = '';

    // Show typing indicator
    setTimeout(() => {
        let response = demoResponses.default;
        
        if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
            response = demoResponses.food;
        } else if (message.includes('bill') || message.includes('payment') || message.includes('due')) {
            response = demoResponses.bills;
        } else if (message.includes('spend') || message.includes('afford') || message.includes('buy')) {
            response = demoResponses.spend;
        } else if (message.includes('save') || message.includes('emergency')) {
            response = demoResponses.save;
        } else if (message.includes('credit') || message.includes('score')) {
            response = demoResponses.credit;
        }
        
        addDemoMessage(response, false);
    }, 1000);
}

function addDemoMessage(text, isUser) {
    const messages = document.getElementById('demo-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : ''}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${isUser ? '' : 'ai-avatar'}">${isUser ? 'You' : 'Dr'}</div>
        <div class="message-content">${text}</div>
    `;
    
    messages.appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}

function handleDemoEnter(event) {
    if (event.key === 'Enter') {
        sendDemoMessage();
    }
}

// Add intersection observer for animations
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

// Observe elements for animations
document.querySelectorAll('.problem-card, .feature-card, .story-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
