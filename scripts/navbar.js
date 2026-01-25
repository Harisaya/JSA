const NAVBAR_CATEGORIES = [
    { id: 'all', label: 'Tất Cả', icon: '📦' },
    { id: 'food', label: 'Thực Phẩm', icon: '🍔' },
    { id: 'medicine', label: 'Thuốc', icon: '💊' },
    { id: 'accessories', label: 'Phụ Kiện', icon: '👗' },
    { id: 'beauty', label: 'Mỹ Phẩm', icon: '💄' },
    { id: 'electronics', label: 'Điện Tử', icon: '📱' },
    { id: 'home', label: 'Nhà', icon: '🛋️' },
    { id: 'sports', label: 'Thể Thao', icon: '⚽' }
];

function initNavbar() {
    const navbarContainer = document.getElementById('navbar');
    if (!navbarContainer) {
        console.log('[v0] Navbar container not found');
        return;
    }

    // Render navbar items
    navbarContainer.innerHTML = NAVBAR_CATEGORIES.map(category => `
        <button class="navbar-item ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}" title="${category.label}">
            <span class="navbar-icon">${category.icon}</span>
            <span class="navbar-label">${category.label}</span>
        </button>
    `).join('');

    // Add click listeners for filtering
    const navbarItems = navbarContainer.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            
            // Update active state
            navbarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Trigger category filter event
            const event = new CustomEvent('categoryChanged', { detail: { category } });
            document.dispatchEvent(event);
            
            // Store active category
            localStorage.setItem('activeCategory', category);
        });
    });

    // Set active category based on URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category') || localStorage.getItem('activeCategory') || 'all';
    const activeItem = navbarContainer.querySelector(`[data-category="${activeCategory}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    console.log('[v0] Navbar initialized');
}

function setActiveNavbarItem(category) {
    const navbarContainer = document.getElementById('navbar');
    if (!navbarContainer) return;
    
    const navbarItems = navbarContainer.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === category) {
            item.classList.add('active');
        }
    });
    
    localStorage.setItem('activeCategory', category);
}
