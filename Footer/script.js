// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects for social media icons
const socialIcons = document.querySelectorAll('.follow i');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add animation for newsletter button
const newsletterBtn = document.querySelector('#newletter button');
if (newsletterBtn) {
    newsletterBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#04574f';
    });
    
    newsletterBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#088178';
    });
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle newsletter form submission
const emailInput = document.getElementById('emailInput');
if (emailInput) {
    emailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            if (!isValidEmail(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#088178';
            }
        } else {
            this.style.borderColor = 'transparent';
        }
    });
} 