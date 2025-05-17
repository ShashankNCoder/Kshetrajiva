// DOM Elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const forgotPasswordLink = document.querySelector('.forgot-password');

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length > 0;
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Animation handlers
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Form submission handlers
// Step navigation handlers
document.querySelector('.next-step').addEventListener('click', () => {
    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    const stepIndicators = document.querySelectorAll('.step');

    if (validateStep1()) {
        step1.classList.remove('active');
        step2.classList.add('active');
        stepIndicators[0].classList.remove('active');
        stepIndicators[1].classList.add('active');
    }
});

document.querySelector('.prev-step').addEventListener('click', () => {
    const step1 = document.querySelector('.step-1');
    const step2 = document.querySelector('.step-2');
    const stepIndicators = document.querySelectorAll('.step');

    step2.classList.remove('active');
    step1.classList.add('active');
    stepIndicators[1].classList.remove('active');
    stepIndicators[0].classList.add('active');
});

function validateStep1() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    if (!validateName(name)) {
        alert('Please enter your name');
        return false;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    if (!validatePassword(password)) {
        alert('Password must be at least 6 characters long');
        return false;
    }
    if (phone && !validatePhone(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    return true;
}

let registerOTPInterval = null;
let registerCurrentOTP = '';

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        survey_number: formData.get('survey_number'),
        land_location: formData.get('land_location'),
        detailed_address: formData.get('detailed_address')
    };
    const otpInput = formData.get('register-otp');
    const otpSection = document.getElementById('register-otp-section');

    // Validate form data
    if (!validateEmail(userData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    if (!validatePassword(userData.password)) {
        alert('Password must be at least 6 characters long');
        return;
    }
    if (!validateName(userData.name)) {
        alert('Please enter your name');
        return;
    }
    if (userData.phone && !validatePhone(userData.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    try {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        if (users.some(user => user.email === userData.email)) {
            alert('Email already registered! Please use a different email.');
            return;
        }

        if (!otpSection.classList.contains('hidden')) {
            // Verify OTP
            if (otpInput === registerCurrentOTP) {
                // Add new user to array
                users.push(userData);

                // Save updated users array
                localStorage.setItem('users', JSON.stringify(users));

                // Set current user
                localStorage.setItem('currentUser', JSON.stringify(userData));

                alert('Registration successful!');
                window.location.href = "../../index2.html";
            } else {
                alert('Invalid OTP! Please try again.');
            }
        } else {
            // Show OTP section and send OTP
            otpSection.classList.remove('hidden');
            registerCurrentOTP = generateOTP();
            alert(`Your OTP is: ${registerCurrentOTP}`); // In real app, this would be sent via SMS/email
            if (registerOTPInterval) clearInterval(registerOTPInterval);
            registerOTPInterval = startOTPTimer('register-timer', 'register-resend-otp');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
});

// OTP related functions
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function startOTPTimer() {
    const timerElement = document.getElementById('timer');
    let timeLeft = 120; // 2 minutes
    const resendButton = document.getElementById('resend-otp');
    resendButton.disabled = true;

    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            resendButton.disabled = false;
        }
        timeLeft--;
    }, 1000);

    return countdown;
}

let currentOTP = '';
let timerInterval = null;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const otpInput = formData.get('otp');
    const otpSection = document.getElementById('otp-section');

    // Validate form data
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    if (!validatePassword(password)) {
        alert('Password must be at least 6 characters long');
        return;
    }

    try {
        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (!otpSection.classList.contains('hidden')) {
                // Verify OTP
                if (otpInput === currentOTP) {
                    if (timerInterval) clearInterval(timerInterval);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Login successful!');
                    window.location.href = "../../index2.html";
                } else {
                    alert('Invalid OTP! Please try again.');
                }
            } else {
                // Show OTP section and send OTP
                otpSection.classList.remove('hidden');
                currentOTP = generateOTP();
                alert(`Your OTP is: ${currentOTP}`); // In real app, this would be sent via SMS/email
                if (timerInterval) clearInterval(timerInterval);
                timerInterval = startOTPTimer('timer', 'resend-otp');
            }
        } else {
            alert('Invalid email or password!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});

// Password reset form elements
const resetPasswordForm = document.createElement('form');
resetPasswordForm.id = 'reset-password-form';
resetPasswordForm.classList.add('hidden');
resetPasswordForm.innerHTML = `
    <h1>Reset Password</h1>
    <input type="email" placeholder="Email" required name="reset-email" aria-label="Email">
    <div id="reset-otp-section" class="otp-section hidden">
        <input type="text" placeholder="Enter OTP" required maxlength="6" name="reset-otp" aria-label="OTP">
        <div class="otp-timer">Time remaining: <span id="reset-timer">02:00</span></div>
        <button type="button" id="reset-resend-otp" class="resend-button">Resend OTP</button>
    </div>
    <div id="new-password-section" class="hidden">
        <input type="password" placeholder="New Password" required minlength="6" name="new-password" aria-label="New Password">
        <input type="password" placeholder="Confirm New Password" required minlength="6" name="confirm-password" aria-label="Confirm New Password">
    </div>
    <button type="submit">
        <span class="button-text">Reset Password</span>
        <span class="loading-spinner hidden"></span>
    </button>
    <button type="button" class="back-to-login">Back to Login</button>
`;

const signInForm = document.querySelector('.sign-in form');
signInForm.parentNode.appendChild(resetPasswordForm);

// Forgot password handler
let resetOTPInterval = null;
let resetCurrentOTP = '';

if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        signInForm.classList.add('hidden');
        resetPasswordForm.classList.remove('hidden');
    });
}

// Back to login handler
const backToLoginBtn = resetPasswordForm.querySelector('.back-to-login');
backToLoginBtn.addEventListener('click', () => {
    resetPasswordForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
    resetPasswordForm.reset();
    document.getElementById('reset-otp-section').classList.add('hidden');
    document.getElementById('new-password-section').classList.add('hidden');
    if (resetOTPInterval) clearInterval(resetOTPInterval);
});

// Reset password form handler
resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(resetPasswordForm);
    const email = formData.get('reset-email');
    const otp = formData.get('reset-otp');
    const newPassword = formData.get('new-password');
    const confirmPassword = formData.get('confirm-password');
    
    const otpSection = document.getElementById('reset-otp-section');
    const newPasswordSection = document.getElementById('new-password-section');

    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        if (!user) {
            alert('Email not found!');
            return;
        }

        if (!otpSection.classList.contains('hidden') && !newPasswordSection.classList.contains('hidden')) {
            // Final step: Update password
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            if (!validatePassword(newPassword)) {
                alert('Password must be at least 6 characters long');
                return;
            }
            if (otp !== resetCurrentOTP) {
                alert('Invalid OTP!');
                return;
            }

            // Update user's password
            user.password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Password reset successful! Please login with your new password.');
            backToLoginBtn.click();

        } else if (!otpSection.classList.contains('hidden')) {
            // Verify OTP and show new password fields
            if (otp === resetCurrentOTP) {
                newPasswordSection.classList.remove('hidden');
            } else {
                alert('Invalid OTP!');
            }
        } else {
            // Send OTP
            otpSection.classList.remove('hidden');
            resetCurrentOTP = generateOTP();
            alert(`Your OTP is: ${resetCurrentOTP}`); // In real app, this would be sent via SMS/email
            if (resetOTPInterval) clearInterval(resetOTPInterval);
            resetOTPInterval = startOTPTimer('reset-timer', 'reset-resend-otp');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during password reset.');
    }
});

// Update OTP timer function to be reusable
function startOTPTimer(timerId, resendBtnId) {
    const timerElement = document.getElementById(timerId);
    let timeLeft = 120; // 2 minutes
    const resendButton = document.getElementById(resendBtnId);
    resendButton.disabled = true;

    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            resendButton.disabled = false;
        }
        timeLeft--;
    }, 1000);

    return countdown;
}

// Update the login form timer to use the new function
timerInterval = startOTPTimer('timer', 'resend-otp');