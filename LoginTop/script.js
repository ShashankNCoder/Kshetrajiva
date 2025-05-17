let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        document.getElementById('topdiv').classList.add('hide-topbar');
        document.getElementById('navdiv').classList.add('nav-shift');
    } else {
        // Scrolling up
        document.getElementById('topdiv').classList.remove('hide-topbar');
        document.getElementById('navdiv').classList.remove('nav-shift');
    }
    lastScrollY = window.scrollY;
});