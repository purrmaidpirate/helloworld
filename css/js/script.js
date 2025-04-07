document.addEventListener('DOMContentLoaded', function() {
    const resizer = document.getElementById('resizer');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    // Initial width of the sidebar
    let sidebarWidth = sidebar.offsetWidth;
    let x = 0;
    
    // Function to handle mouse down event on resizer
    const mouseDownHandler = function(e) {
        // Get the current mouse position
        x = e.clientX;
        
        // Store the initial sidebar width
        sidebarWidth = sidebar.offsetWidth;
        
        // Add event listeners for mouse move and mouse up
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        
        // Add active class to resizer
        resizer.classList.add('active');
        
        // Prevent text selection during drag
        document.body.style.userSelect = 'none';
    };
    
    // Function to handle mouse move event
    const mouseMoveHandler = function(e) {
        // Calculate how far the mouse has been moved
        const dx = e.clientX - x;
        
        // Update the sidebar width
        const newSidebarWidth = sidebarWidth + dx;
        
        // Apply constraints (min and max width)
        if (newSidebarWidth >= 200 && newSidebarWidth <= window.innerWidth * 0.4) {
            sidebar.style.width = `${newSidebarWidth}px`;
        }
    };
    
    // Function to handle mouse up event
    const mouseUpHandler = function() {
        // Remove event listeners
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        
        // Remove active class from resizer
        resizer.classList.remove('active');
        
        // Restore text selection
        document.body.style.userSelect = '';
    };
    
    // Add event listener for mouse down on resizer
    resizer.addEventListener('mousedown', mouseDownHandler);
    
    // Handle touch events for mobile devices
    resizer.addEventListener('touchstart', function(e) {
        x = e.touches[0].clientX;
        sidebarWidth = sidebar.offsetWidth;
        
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('touchend', touchEndHandler);
        
        resizer.classList.add('active');
    });
    
    const touchMoveHandler = function(e) {
        const dx = e.touches[0].clientX - x;
        const newSidebarWidth = sidebarWidth + dx;
        
        if (newSidebarWidth >= 200 && newSidebarWidth <= window.innerWidth * 0.4) {
            sidebar.style.width = `${newSidebarWidth}px`;
        }
    };
    
    const touchEndHandler = function() {
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
        
        resizer.classList.remove('active');
    };
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset sidebar width if it exceeds max width after window resize
        if (sidebar.offsetWidth > window.innerWidth * 0.4) {
            sidebar.style.width = `${window.innerWidth * 0.4}px`;
        }
    });
});
