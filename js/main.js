document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        navLinks.classList.toggle('show');
        
        // Change menu icon
        const svg = this.querySelector('svg');
        if (navLinks.classList.contains('show')) {
            svg.innerHTML = '<path d="M18 6L6 18M6 6l12 12"></path>';
        } else {
            svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
            navLinks.classList.remove('show');
            const svg = mobileMenuBtn.querySelector('svg');
            svg.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
        }
    });

    // Prevent menu from closing when clicking inside nav-links
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}); 