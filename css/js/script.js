document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const resizeHandle = document.getElementById('resize-handle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const cursor = document.getElementById('custom-cursor');
    let isResizing = false;
    
    // Custom cursor functionality
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Resize functionality
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeHandle.classList.add('active');
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const newWidth = e.clientX;
        
        if (newWidth > 200 && newWidth < window.innerWidth * 0.7) {
            // Update sidebar width
            sidebar.style.width = newWidth + 'px';
            
            // Update resize handle position
            resizeHandle.style.left = newWidth + 'px';
            
            // Update content area margin and width
            contentArea.style.marginLeft = (newWidth + 10) + 'px';
            contentArea.style.width = `calc(100% - ${newWidth + 10}px)`;
            
            // Update grid overlay position
            const gridOverlay = document.querySelector('.grid-overlay');
            if (gridOverlay) {
                gridOverlay.style.left = (newWidth + 10) + 'px';
            }
            
            // Update grid background position
            const beforePseudo = document.styleSheets[0].cssRules;
            for (let i = 0; i < beforePseudo.length; i++) {
                if (beforePseudo[i].selectorText === ".content-area::before") {
                    beforePseudo[i].style.left = (newWidth + 10) + 'px';
                    break;
                }
            }
        }
    });
    
    document.addEventListener('mouseup', function() {
        isResizing = false;
        resizeHandle.classList.remove('active');
    });
    
    // Responsive grid sizing
    function adjustGridSizes() {
        const contentArea = document.getElementById('content-area');
        const contentWidth = contentArea.offsetWidth;
        const gallery = document.getElementById('gallery-grid');
        
        // Set columns based on available width
        if (contentWidth < 600) {
            gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
        
        // Adjust item sizes
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            const minSize = Math.max(200, contentWidth / 4);
            item.style.minHeight = minSize + 'px';
        });
    }
    
    // Initial adjustment
    adjustGridSizes();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustGridSizes);
});