document.addEventListener('DOMContentLoaded', function() {
    // Clear cart and order summary from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('orderSummary');

    // Generate random order number
    const orderNum = 'ORD-' + Math.floor(Math.random() * 10000);
    document.getElementById('orderNumber').textContent = orderNum;

    // Get and display the amount paid from orderSummary if available
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || { total: 5000 };
    document.getElementById('amountPaid').textContent = orderSummary.total.toFixed(2);
    
    // Set delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    document.getElementById('deliveryDate').textContent = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
        });