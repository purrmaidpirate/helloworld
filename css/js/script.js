document.addEventListener('DOMContentLoaded', function() {
    const resizeHandle = document.getElementById('resize-handle');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    const cursor = document.getElementById('custom-cursor');
    let isResizing = false;
    
    // Combined mousemove handler for both cursor and resizing
    document.addEventListener('mousemove', function(e) {
        // Update custom cursor position
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Handle resizing if active
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
        }
    });
    
    // Mouse events for desktop
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeHandle.classList.add('active');
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', function() {
        isResizing = false;
        resizeHandle.classList.remove('active');
    });
    
    // Touch events for mobile
    resizeHandle.addEventListener('touchstart', function(e) {
        isResizing = true;
        resizeHandle.classList.add('active');
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isResizing) return;
        
        const touch = e.touches[0];
        const newWidth = touch.clientX;
        
        if (newWidth > 200 && newWidth < window.innerWidth * 0.7) {
            // Update sidebar width
            sidebar.style.width = newWidth + 'px';
            
            // Update resize handle position
            resizeHandle.style.left = newWidth + 'px';
            
            // Update content area margin and width
            contentArea.style.marginLeft = (newWidth + 10) + 'px';
            contentArea.style.width = `calc(100% - ${newWidth + 10}px)`;
        }
    });
    
    document.addEventListener('touchend', function() {
        isResizing = false;
        resizeHandle.classList.remove('active');
    });
    
    // Ensure cursor visibility when page loads
    cursor.style.opacity = 1;
});