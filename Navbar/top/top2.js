class TopBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <style>
          :root {
              --primary-color: #333;
              --secondary-color: #fff;
              --accent-color: #007bff;
              --gradient-start: #2193b0;
              --gradient-end: #6dd5ed;
              --hover-color: #4a90e2;
          }

          /* Dark theme variables */
          [data-theme="dark"] {
              --primary-color: #fff;
              --secondary-color: #1a1a1a;
              --accent-color: #4da3ff;
              --gradient-start: #203a43;
              --gradient-end: #2c5364;
          }

          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: var(--secondary-color);
              color: var(--primary-color);
              transition: all 0.3s ease;
          }

          .navbar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 8px;
              background: #000000;
              color: white;
              box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
              min-height: 40px;
          }

          .left-section, .right-section {
              display: flex;
              align-items: center;
              gap: 10px;
          }

          /* Social Icons */
          .social-icons {
              display: flex;
              gap: 10px;
              align-items: center;
          }

          .social-icon {
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              text-decoration: none;
              transition: all 0.3s ease;
          }

          .social-icon i {
              font-size: 10px;
              color: #fff;
          }

          .social-icon.facebook { background: #1877f2; }
          .social-icon.facebook:hover { background: #0d65d9; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(24, 119, 242, 0.4); }

          .social-icon.youtube { background: #ff0000; }
          .social-icon.youtube:hover { background: #cc0000; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 0, 0, 0.4); }

          .social-icon.twitter { background: #1da1f2; }
          .social-icon.twitter:hover { background: #0d8ed9; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(29, 161, 242, 0.4); }

          .social-icon.instagram { background: #e4405f; background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
          .social-icon.instagram:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(228, 64, 95, 0.4); }

          .hover-effect:hover {
              transform: translateY(-2px);
              color: var(--accent-color);
          }

          /* Search Bar */
          .search-bar {
              display: flex;
              align-items: center;
              background: rgba(75, 0, 130, 0.3);
              border-radius: 20px;
              padding: 4px;
              border: 1px solid rgba(147, 112, 219, 0.3);
              box-shadow: 0 0 8px rgba(147, 112, 219, 0.2);
          }

          .search-bar .modern-input {
              background-color: rgba(255, 255, 255, 0.9);
              color: #333;
              border: 1px solid rgba(255, 255, 255, 0.2);
              padding: 6px 10px;
              border-radius: 4px;
              width: 160px;
              outline: none;
          }

          .search-bar .modern-input::placeholder {
              color: #666;
          }

          .search-bar .search-button {
              background-color: rgba(255, 255, 255, 0.9);
              color: #333;
              border: none;
              padding: 6px 9px;
              border-radius: 4px;
              cursor: pointer;
          }

          .search-button:hover {
              color: #BA55D3;
              transform: scale(1.1);
          }

          /* Text Size Controls */
          .text-size-controls {
              display: flex;
              gap: 6px;
          }

          .modern-button {
              padding: 4px 8px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              color: white;
              cursor: pointer;
              border-radius: 6px;
              transition: all 0.3s ease;
          }

          .modern-button:hover {
              background: rgba(255, 255, 255, 0.1);
          }

          /* Navigation Items */
          .nav-item {
              color: white;
              text-decoration: none;
              padding: 4px 10px;
              border-radius: 6px;
              transition: all 0.3s ease;
          }

          .home-btn {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              font-size: 12px;
          }

          .home-btn:hover {
              background: rgba(255, 255, 255, 0.1);
          }

          /* Language Selector */
          .modern-select {
              padding: 4px 10px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.05);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.1);
              cursor: pointer;
              outline: none;
          }

          /* Google Translate Customization */
          .goog-te-gadget {
              color: transparent !important;
          }

          .goog-te-gadget .goog-te-combo {
              margin: 0 !important;
              padding: 4px 10px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.05);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.1);
              cursor: pointer;
              outline: none;
          }

          .goog-te-gadget img {
              display: none !important;
          }

          .goog-te-banner-frame {
              display: none !important;
          }

          @media (max-width: 480px) {
              .modern-input {
                  width: 100px;
              }

              .social-icons {
                  gap: 4px;
              }

              .social-icon {
                  width: 20px;
                  height: 20px;
              }

              .social-icon i {
                  font-size: 12px;
              }

              .text-size-controls {
                  gap: 3px;
              }

              .modern-button {
                  padding: 3px 5px;
                  font-size: 11px;
              }

              .nav-item {
                  padding: 3px 6px;
                  font-size: 11px;
              }

              .navbar {
                  padding: 6px;
              }

              .left-section, .right-section {
                  flex-direction: column;
                  gap: 6px;
              }

              .search-bar {
                  width: 100%;
                  max-width: 200px;
              }

              .modern-select {
                  width: 100%;
                  max-width: 200px;
                  font-size: 11px;
                  padding: 3px 6px;
              }

              .home-btn {
                  width: 100%;
                  max-width: 200px;
                  font-size: 11px;
                  padding: 3px 6px;
              }
          }
        </style>
        <nav class="navbar glass-effect">
          <div class="left-section">
            <div class="social-icons">
              <a href="https://facebook.com" class="social-icon facebook hover-effect" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="https://youtube.com" class="social-icon youtube hover-effect" target="_blank"><i class="fab fa-youtube"></i></a>
              <a href="https://twitter.com" class="social-icon twitter hover-effect" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="https://instagram.com" class="social-icon instagram hover-effect" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
            <div class="search-bar">
              <form id="search-form" onsubmit="handleSearch(event)">
                <input type="text" id="search-input" placeholder="Search..." class="modern-input">
                <button type="submit" class="search-button"><i class="fas fa-search"></i></button>
              </form>
            </div>
          </div>
          <div class="right-section">
            <a href="../../index2.html" class="nav-item home-btn hover-effect"><i class="fas fa-home"></i> HOME</a>
            <div class="text-size-controls">
              <button class="size-btn modern-button" onclick="changeTextSize('decrease')">A-</button>
              <button class="size-btn modern-button" onclick="changeTextSize('increase')">A+</button>
            </div>
            <div id="google_translate_element"></div>
            <button class="theme-toggle modern-button" onclick="toggleTheme()"><i class="fas fa-moon"></i></button>
          </div>
        </nav>
      `;
      
      // Load Google Translate
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
  
      // Add scroll behavior
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
          const navbar = this.querySelector('.navbar');
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > lastScroll && currentScroll > 50) {
              // Scrolling down - hide the navbar
              navbar.style.transform = 'translateY(-100%)';
          } else {
              // Scrolling up - show the navbar
              navbar.style.transform = 'translateY(0)';
          }
          
          lastScroll = currentScroll;
      });
  }
}

customElements.define('top-bar', TopBar);

// Initialize settings
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', savedTheme);
    
    // Load text size
    const savedSize = localStorage.getItem('textSize') || 100;
    document.body.style.fontSize = savedSize + '%';
});

// Global functions
function toggleTheme() {
    const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function changeTextSize(action) {
    let currentSize = parseInt(document.body.style.fontSize) || 100;
    currentSize = action === 'increase' ? 
      Math.min(150, currentSize + 10) : 
      Math.max(60, currentSize - 10);
    
    document.body.style.fontSize = currentSize + '%';
    localStorage.setItem('textSize', currentSize);

    // Show size notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 1000;
        font-size: 14px;
    `;
    notification.textContent = `Text Size: ${currentSize}%`;
    document.body.appendChild(notification);

    // Remove notification after 1.5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 1500);
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,kn,ta,ml',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchQuery = encodeURIComponent(searchInput.value.trim());
    if (searchQuery) {
        window.location.href = `https://www.google.com/search?q=${searchQuery}`;
    }
}