// Check if user is logged in
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please login to access your profile');
        window.location.href = "../LoginTop/login/login.html";
        return;
    }

    // Populate profile data
    document.getElementById('username').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
    document.getElementById('user-phone').textContent = currentUser.phone || "Not Provided";
    document.getElementById('user-address').textContent = `${currentUser.detailed_address || ""}
${currentUser.land_location || ""}
Survey Number: ${currentUser.survey_number || "Not Provided"}`;
    
    document.getElementById('full-name').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('phone').value = currentUser.phone || "";
    document.getElementById('address').value = currentUser.detailed_address || "";
    document.getElementById('land-location').value = currentUser.land_location || "";
    document.getElementById('survey-number').value = currentUser.survey_number || "";

    // Load profile image
    if (currentUser.profileImage) {
        document.getElementById('profile-image').src = currentUser.profileImage;
    }
};

function editProfile() {
    const inputs = document.querySelectorAll('#profile-form input');
    inputs.forEach(input => {
        if (input.id !== 'email') { // Prevent email editing
            input.removeAttribute('disabled');
        }
    });
    document.getElementById('save-btn').style.display = 'block';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "../LoginTop/login/login.html";
}

document.getElementById('profile-form').onsubmit = function(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Update user information
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        detailed_address: document.getElementById('address').value,
        land_location: document.getElementById('land-location').value,
        survey_number: document.getElementById('survey-number').value
    };

    // Update in users array
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Disable inputs and hide save button
        const inputs = document.querySelectorAll('#profile-form input');
        inputs.forEach(input => input.setAttribute('disabled', true));
        document.getElementById('save-btn').style.display = 'none';

        // Update display
        document.getElementById('username').textContent = updatedUser.name;
        document.getElementById('user-phone').textContent = updatedUser.phone;
        document.getElementById('user-address').textContent = updatedUser.address;

        alert('Profile updated successfully!');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Load saved profile image if it exists
    if (currentUser && currentUser.profileImage) {
        document.getElementById('profile-image').src = currentUser.profileImage;
    }

    // Handle image upload
    document.getElementById('image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                const imageData = event.target.result;
                
                // Update profile image display
                document.getElementById('profile-image').src = imageData;

                // Save image data to localStorage
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Update current user
                currentUser.profileImage = imageData;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Update user in users array
                const userIndex = users.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    users[userIndex].profileImage = imageData;
                    localStorage.setItem('users', JSON.stringify(users));
                }
            };

            reader.readAsDataURL(file);
        }
    });
});