// Get DOM elements
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.blog-box');

// Add event listeners
searchInput.addEventListener('input', filterProducts);
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Update active button
        document.querySelector('.filter-button.active').classList.remove('active');
        e.target.classList.add('active');
        filterProducts();
    });
});

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Filter products based on search input and selected category
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-button.active').dataset.category;

    productCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const content = title + ' ' + description;

        // Check if card matches both search term and category
        const matchesSearch = content.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || getProductCategory(title) === activeCategory;

        // Apply smooth transition
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

function searchProducts() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var blogBoxes = document.getElementsByClassName("blog-box");

    for (var i = 0; i < blogBoxes.length; i++) {
        var productName = blogBoxes[i].querySelector("h4").textContent;
        var productDesc = blogBoxes[i].querySelector("p").textContent;
        var searchContent = productName + " " + productDesc;
        
        if (searchContent.toUpperCase().indexOf(filter) > -1) {
            blogBoxes[i].style.display = "";
        } else {
            blogBoxes[i].style.display = "none";
        }
    }
}

// Helper function to determine product category
function getProductCategory(title) {
    const detectionProducts = ['smart detection camera'];
    const preventionProducts = ['Pump', 'sprayer', 'speakers', 'chemical container', 'reflective-tapes', 'power controller'];
    const supportProducts = ['services'];

    title = title.toLowerCase();
    
    if (detectionProducts.some(product => title.includes(product))) return 'detection';
    if (preventionProducts.some(product => title.includes(product))) return 'prevention';
    if (supportProducts.some(product => title.includes(product))) return 'support';
    
    return 'all';
}

// Initialize products display and scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    productCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transition = 'opacity 0.3s ease';
    });

    // Add scroll behavior for top bar
    const topDiv = document.getElementById('topdiv');
    if (topDiv) {
        topDiv.style.transition = 'transform 0.3s ease';
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide the top bar
                topDiv.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show the top bar
                topDiv.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
});

// Image switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const MainImg = document.getElementById('MainImg');
    const smallImgs = document.getElementsByClassName('small-img');

    // Add click event to each thumbnail
    Array.from(smallImgs).forEach(img => {
        img.addEventListener('click', function() {
            MainImg.src = this.src;
            
            // Remove active class from all thumbnails
            Array.from(smallImgs).forEach(thumb => thumb.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
        });

        // Add hover effect
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

function addToCart() {
    const productDetails = document.querySelector('.single-pro-details');
    if (!productDetails) return;

    const name = productDetails.querySelector('h4').textContent;
    const price = parseFloat(productDetails.querySelector('h2').textContent.replace('₹', ''));
    const quantity = parseInt(productDetails.querySelector('input[type="number"]').value) || 1;
    const image = document.querySelector('#MainImg').src;

    // Get existing cart or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item if it doesn't exist
        cart.push({
            name,
            price,
            quantity,
            image
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show success message
    alert('Item added to cart successfully!');
}

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