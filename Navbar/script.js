// Add scroll event listener for navbar behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;

    // Set active link based on current URL
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Remove leading slash if present for consistent comparison
            const linkPath = href.replace(/^\//, '');
            const currentCleanPath = currentPath.replace(/^\//, '');
            
            if (currentCleanPath === linkPath || 
                (currentCleanPath === '' && linkPath === 'index.html') || 
                (currentCleanPath === 'index.html' && linkPath === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Call setActiveLink on page load
    setActiveLink();

    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        lastScrollTop = scrollTop;
    });

    // Active link handling with page reload
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Store the active link in sessionStorage
            sessionStorage.setItem('activeLink', this.getAttribute('href'));
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // For hash links, prevent default behavior
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
        });
    });

    // Check for stored active link on page load
    const storedActiveLink = sessionStorage.getItem('activeLink');
    if (storedActiveLink) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === storedActiveLink) {
                link.classList.add('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});