document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-button'); 
    const appContainer = document.querySelector('.app-container');
    const collapseIcon = document.querySelector('.icon-collapse');
    const expandIcon = document.querySelector('.icon-expand');

    // must hide the expand icon if the sidebar is open
    if (!appContainer.classList.contains('sidebar-collapsed')) {
        expandIcon.style.display = 'none';
    }

    // switch css selector to show only a bit
    const toggleSidebar = () => {
        appContainer.classList.toggle('sidebar-collapsed');
        
        // must change to icons when collapsed
        if (appContainer.classList.contains('sidebar-collapsed')) {
            localStorage.setItem('sidebarState', 'collapsed');
            collapseIcon.style.display = 'none';
            expandIcon.style.display = 'block';
        } else {
            localStorage.setItem('sidebarState', 'open');
            collapseIcon.style.display = 'block';
            expandIcon.style.display = 'none';
        }
    };
    
    const savedState = localStorage.getItem('sidebarState');
    if (savedState === 'collapsed') {
        appContainer.classList.add('sidebar-collapsed');
        collapseIcon.style.display = 'none';
        expandIcon.style.display = 'block';
    }

    if (toggleBtn) { 
        toggleBtn.addEventListener('click', toggleSidebar);
    }
});