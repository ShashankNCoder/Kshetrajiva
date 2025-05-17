document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const testimonials = track.innerHTML;
    
    // Duplicate testimonials for smooth infinite scroll
    track.innerHTML = testimonials + testimonials;
    
    // Adjust animation duration based on content width
    const adjustAnimation = () => {
        const trackWidth = track.offsetWidth;
        const duration = trackWidth / 50; // Adjust speed by changing divisor
        track.style.animationDuration = `${duration}s`;
    };
    
    adjustAnimation();
    window.addEventListener('resize', adjustAnimation);
});