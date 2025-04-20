document.addEventListener('DOMContentLoaded', function() {
    // Handle responsive sizing
    function adjustGrid() {
        const contentWidth = document.querySelector('.content-area').offsetWidth;
        const gallery = document.querySelector('.gallery-grid');
        
        if (contentWidth < 600) {
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }
    
    // Initial adjustment
    adjustGrid();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustGrid);
});