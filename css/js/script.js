document.addEventListener('DOMContentLoaded', function() {
    // Handle responsive grid sizing
    function adjustGridSizes() {
        const contentArea = document.getElementById('content-area');
        const contentWidth = contentArea.offsetWidth;
        const gallery = document.getElementById('gallery-grid');
        
        // Set minimum size based on available width
        if (contentWidth < 600) {
            // For very small screens, we might want to drop to 2 columns
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            // Otherwise stick to 3 columns
            gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
        
        // Calculate and set item size to ensure squares aren't too small
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            // Set minimum height to ensure they're not too small
            const minSize = Math.max(200, contentWidth / 4);
            item.style.minHeight = minSize + 'px';
        });
    }
    
    // Initial adjustment
    adjustGridSizes();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustGridSizes);
});