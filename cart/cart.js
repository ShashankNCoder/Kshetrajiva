function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartMessage = document.getElementById('cart-message');
    const checkoutButton = document.getElementById('checkout');
    let subtotal = 0;

    console.log('Cart contents:', cart);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="../products/products.html" class="continue-shopping">Continue Shopping</a>
            </div>`;
        updateOrderSummary(0);
        cartMessage.style.display = 'none';
        checkoutButton.disabled = true;
    } else {
        cartMessage.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`;
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            console.log(`Original item ${index} image path:`, item.image);

            let imagePath = item.image || 'img/Products/placeholder.jpg';
            if (!imagePath.startsWith('data:') && !imagePath.startsWith('http') && !imagePath.startsWith('img/')) {
                imagePath = '../' + imagePath;
            }

            console.log(`Resolved image path for item ${index}:`, imagePath);

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="item-image-container">
                        <img 
                            src="${imagePath}" 
                            alt="${item.name}" 
                            class="item-image"
                            onerror="window.location.href = '../404-notfound/index.html';"
                            onload="console.log('Successfully loaded:', this.src)"
                            style="max-width: 100px; height: auto;"
                        >
                    </div>
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">₹${item.price}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="item-total">₹${item.price * item.quantity}</div>
                    <button class="remove-item" onclick="removeItem(${index})">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            `;
            subtotal += item.price * item.quantity;
        });

        updateOrderSummary(subtotal);
        checkoutButton.disabled = false;
    }
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        loadCart();
    }
}

function updateOrderSummary(subtotal) {
    const shipping = subtotal > 0 ? 50 : 0; // Fixed shipping cost of ₹50
    const tax = subtotal * 0.18; // 18% GST
    const companyService = subtotal > 0 ? (document.querySelector('input[name="company-service"]:checked')?.value === 'yes' ? 1000 : 0) : 0;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('service-charge').textContent = `₹${companyService.toFixed(2)}`;
    
    const total = subtotal + shipping + tax + companyService;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;

    // Update cart message with item count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartMessage = document.getElementById('cart-message');
    if (cart.length > 0) {
        cartMessage.textContent = `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`;
        cartMessage.style.display = 'block';
    } else {
        cartMessage.style.display = 'none';
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        // Store order summary in localStorage for payment page
        const orderSummary = {
            subtotal: parseFloat(document.getElementById('subtotal').textContent.slice(1)),
            shipping: parseFloat(document.getElementById('shipping').textContent.slice(1)),
            tax: parseFloat(document.getElementById('tax').textContent.slice(1)),
            total: parseFloat(document.getElementById('total').textContent.slice(1))
        };
        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
        window.location.href = './payment/index.html';
    } else {
        alert("Your cart is empty. Add items to your cart before proceeding to checkout.");
    }
}

function updateOrderStatus(status) {
    localStorage.setItem('orderStatus', status);
    const statusElement = document.getElementById('order-status');
    if (statusElement) {
        statusElement.textContent = `Order Status: ${status}`;
        statusElement.className = `status-${status.toLowerCase()}`;
    }
}

window.onload = function () {
    loadCart();
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('checkout').addEventListener('click', checkout);
    
    // Add event listeners for service options
    document.querySelectorAll('input[name="company-service"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            updateOrderSummary(subtotal);
        });
    });
    
    // Initialize order status
    const currentStatus = localStorage.getItem('orderStatus') || 'Pending';
    updateOrderStatus(currentStatus);
    // Add scroll behavior for navigation bars
    let lastScroll = 0;
    const topDiv = document.getElementById('topdiv');
    const navDiv = document.getElementById('navdiv');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll) {
            // Scrolling down - hide both bars
            topDiv.style.transform = 'translateY(-100%)';
            navDiv.style.transform = 'translateY(-40%)';
        } else {
            // Scrolling up - show both bars
            topDiv.style.transform = 'translateY(0)';
            navDiv.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
};

