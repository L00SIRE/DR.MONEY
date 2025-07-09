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
    'car': "I've analyzed all your accounts. You can afford a $25,000 car with monthly payments up to $420. However, I factored in insurance (+$180/month), maintenance (+$150/month), and gas (+$120/month). This would leave you $340 for other expenses. Want me to look at specific models and financing options?",
    'food': "You spent $287 on food last month. That breaks down to $156 on groceries and $131 on restaurants/delivery. Your 3-month average is $245, so you were a bit over.",
    'bills': "Your next bills are: Netflix ($15.99) on Thursday, Spotify ($9.99) on Friday, and your phone bill ($67) next Tuesday. Total coming up: $92.98.",
    'spend': "Based on your usual expenses and upcoming bills, you have about $340 you can safely spend this week without touching your emergency fund.",
    'save': "You're currently saving $180/month automatically. To reach your $5,000 emergency fund goal, you'd need to save $220/month. Want me to find an extra $40 in your budget?",
    'credit': "Your credit score is 748 (up 12 points from last month). Your on-time payments are helping a lot. Keep it up!",
    'house': "Based on your income ($4,200/month) and debts, you qualify for about $280,000. But I recommend staying under $250,000 to maintain healthy cash flow for emergencies and other goals.",
    'vacation': "You can afford about $2,400 for vacation this year without impacting your emergency fund. I found $200/month you could redirect from dining out and subscriptions if you want to go bigger.",
    'default': "I can help with major purchase decisions (cars, houses), spending analysis, upcoming bills, emergency planning, or credit monitoring. What would you like to know?"
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
        
        if (message.includes('car') || message.includes('buy') || message.includes('afford')) {
            response = demoResponses.car;
        } else if (message.includes('house') || message.includes('home') || message.includes('mortgage')) {
            response = demoResponses.house;
        } else if (message.includes('vacation') || message.includes('trip') || message.includes('travel')) {
            response = demoResponses.vacation;
        } else if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
            response = demoResponses.food;
        } else if (message.includes('bill') || message.includes('payment') || message.includes('due')) {
            response = demoResponses.bills;
        } else if (message.includes('spend') || message.includes('tonight') || message.includes('week')) {
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
document.querySelectorAll('.problem-card, .feature-card, .story-card, .b2b-card, .roadmap-item, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// EmailJS Contact Form Handler
function sendEmail(formData) {
    const templateParams = {
        from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
        from_email: formData.get('email'),
        company: formData.get('company') || 'Not provided',
        inquiry_type: formData.get('inquiryType'),
        message: formData.get('message'),
        to_email: 'info@thedoctormoney.com'
    };

    return emailjs.send('service_aistxzy', 'template_l6yvhxx', templateParams);
}

// Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            formMessage.style.display = 'none';
            
            const formData = new FormData(this);
            
            sendEmail(formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at info@thedoctormoney.com';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                })
                .finally(function() {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                });
        });
    }
});
