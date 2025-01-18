document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        body.style.overflow = body.classList.contains('menu-open') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevent clicks inside the menu from closing it
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Smooth navigation for links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent immediate navigation
            
            // Start closing animation
            closeMenu();
            
            // Get the href
            const href = link.getAttribute('href');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 300); // Match this with your CSS transition time
        });
    });
}); 