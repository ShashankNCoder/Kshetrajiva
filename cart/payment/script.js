function generateBill(event) {
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;

    // Example static bill calculation
    const totalAmount = 5000;

    // Calculate dates
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    const reachingDate = new Date(deliveryDate);

    deliveryDate.setDate(currentDate.getDate() + 5);
    reachingDate.setDate(deliveryDate.getDate() + 2);

    // Update bill details
    document.getElementById('bill-name').textContent = fullName;
    document.getElementById('bill-email').textContent = email;
    document.getElementById('bill-address').textContent = address;
    document.getElementById('bill-city').textContent = city;
    document.getElementById('bill-state').textContent = state;
    document.getElementById('bill-zipcode').textContent = zipCode;
    document.getElementById('bill-total').textContent = totalAmount;
    document.getElementById('delivery-date').textContent = deliveryDate.toDateString();
    document.getElementById('reaching-date').textContent = reachingDate.toDateString();

    // Show modal
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get all required inputs
    const inputs = this.querySelectorAll('input[required], select[required]');
    let isValid = true;
    let firstInvalidInput = null;

    // Check each input
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
            if (!firstInvalidInput) firstInvalidInput = input;
        } else {
            input.classList.remove('invalid');
        }
    });

    // If not valid, show alert and focus first empty field
    if (!isValid) {
        alert('Please fill in all required fields');
        firstInvalidInput.focus();
        return;
    }

    // If valid, proceed with generateBill
    generateBill(event);
});