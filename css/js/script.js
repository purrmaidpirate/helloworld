document.addEventListener('DOMContentLoaded', function() {
    // Handle responsive grid sizing
    function adjustGrid() {
        const contentWidth = document.querySelector('.content-area').offsetWidth;
        const gallery = document.querySelector('.gallery-grid');
        const items = document.querySelectorAll('.gallery-item');
        
        // Adjust columns based on screen width
        if (contentWidth < 600) {
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
        
        // Ensure items have appropriate minimum height
        items.forEach(item => {
            const minSize = Math.max(200, contentWidth / 4);
            item.style.minHeight = minSize + 'px';
        });
    }
    
    // Initial adjustment
    adjustGrid();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustGrid);
});