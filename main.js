// Configuration - RapidAPI
const RAPIDAPI_KEY = 'f95461abeemsh6e3039e52116ac7p152f3ajsnd300217a2f54';
const RAPIDAPI_HOST = 'talabat.p.rapidapi.com';
const DELIVERY_FEE = 5;
const CITIES_MAPPING = {
    'Dubai': 'Dubai',
    'Abu Dhabi': 'Abu Dhabi',
    'Sharjah': 'Sharjah'
};
const API_BASE = 'https://talabat.p.rapidapi.com'; // Declare API_BASE

// State Management
let state = {
    restaurants: [],
    filteredRestaurants: [],
    selectedRestaurant: null,
    cart: [],
    currentCity: 'Dubai',
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'popular'
};

// DOM Elements
const elements = {
    citySelect: document.getElementById('citySelect'),
    headerSearch: document.getElementById('headerSearch'),
    mainSearch: document.getElementById('mainSearch'),
    sortSelect: document.getElementById('sortSelect'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    restaurantsList: document.getElementById('restaurantsList'),
    loadingSpinner: document.getElementById('loading'),
    emptyState: document.getElementById('emptyState'),
    
    cartButton: document.getElementById('cartButton'),
    cartBadge: document.getElementById('cartBadge'),
    
    restaurantModal: document.getElementById('restaurantModal'),
    restaurantContent: document.getElementById('restaurantContent'),
    cartModal: document.getElementById('cartModal'),
    cartContent: document.getElementById('cartContent'),
    
    notification: document.getElementById('notification'),
};

const citySelect = elements.citySelect;
const searchInput = elements.mainSearch;
const searchHeaderInput = elements.headerSearch;
const filterTags = document.querySelectorAll('.filter-tag');
const sortSelect = elements.sortSelect;
const cartIcon = elements.cartButton;
const modalClose = document.querySelector('.modal-close');
const cartClose = document.getElementById('cartClose');
const restaurantModal = elements.restaurantModal;
const cartModal = elements.cartModal;
const cartCount = elements.cartBadge;
const notification = elements.notification;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createLEDBalls();
    setupEventListeners();
    loadRestaurants();
});

// LED Ball Animation
function createLEDBalls() {
    const container = document.body;
    for (let i = 0; i < 3; i++) {
        const ball = document.createElement('div');
        ball.className = 'led-ball';
        ball.style.animationDelay = `${i * 2.5}s`;
        container.appendChild(ball);
        
        // Remove ball after animation completes
        setTimeout(() => {
            ball.remove();
        }, 500 + (i * 2500));
    }
    
    // Restart animation every few seconds
    setInterval(() => {
        createLEDBalls();
    }, 7500);
}

// Mock Data (Fallback) - Multi-category Marketplace
function getMockRestaurants() {
    return [
        // Food Category
        { id: 1, name: 'Pizza Paradise', category: 'food', cuisines: ['Pizza'], rating: 4.8, deliveryTime: '25-35 mins', deliveryFee: 'AED 5', minOrder: 'AED 25', reviews: 1250, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop' },
        { id: 2, name: 'Biryani House', category: 'food', cuisines: ['Asian'], rating: 4.6, deliveryTime: '30-40 mins', deliveryFee: 'AED 4', minOrder: 'AED 30', reviews: 980, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
        { id: 3, name: 'Burger Barn', category: 'food', cuisines: ['Fast Food'], rating: 4.5, deliveryTime: '20-30 mins', deliveryFee: 'AED 3', minOrder: 'AED 20', reviews: 2100, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
        { id: 4, name: 'Sweet Cakes', category: 'food', cuisines: ['Desserts'], rating: 4.9, deliveryTime: '15-25 mins', deliveryFee: 'AED 2', minOrder: 'AED 15', reviews: 750, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
        { id: 5, name: 'Sushi Master', category: 'food', cuisines: ['Asian'], rating: 4.7, deliveryTime: '35-45 mins', deliveryFee: 'AED 6', minOrder: 'AED 35', reviews: 890, image: 'https://images.unsplash.com/photo-1553861519-cdde9b8ec4a5?w=400&h=300&fit=crop' },
        
        // Fashion Category
        { id: 6, name: 'Style Hub', category: 'fashion', cuisines: ['Áo khoác'], rating: 4.7, deliveryTime: '1-2 ngày', deliveryFee: 'AED 8', minOrder: 'AED 50', reviews: 2340, image: 'https://images.unsplash.com/photo-1554521722-7be0672eef4d?w=400&h=300&fit=crop' },
        { id: 7, name: 'Urban Threads', category: 'fashion', cuisines: ['Quần jeans'], rating: 4.6, deliveryTime: '1-2 ngày', deliveryFee: 'AED 7', minOrder: 'AED 45', reviews: 1890, image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=300&fit=crop' },
        { id: 8, name: 'Premium Wear', category: 'fashion', cuisines: ['Áo nam'], rating: 4.8, deliveryTime: '1-2 ngày', deliveryFee: 'AED 9', minOrder: 'AED 60', reviews: 3100, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' },
        
        // Electronics Category
        { id: 9, name: 'Tech Store', category: 'electronics', cuisines: ['Điện thoại'], rating: 4.9, deliveryTime: '2-3 ngày', deliveryFee: 'AED 15', minOrder: 'AED 200', reviews: 4500, image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop' },
        { id: 10, name: 'Gadget Zone', category: 'electronics', cuisines: ['Tai nghe'], rating: 4.7, deliveryTime: '1-2 ngày', deliveryFee: 'AED 10', minOrder: 'AED 80', reviews: 2800, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
        { id: 11, name: 'Smart Electronics', category: 'electronics', cuisines: ['Máy tính'], rating: 4.8, deliveryTime: '2-3 ngày', deliveryFee: 'AED 18', minOrder: 'AED 300', reviews: 3200, image: 'https://images.unsplash.com/photo-1588872657840-218e412ee91e?w=400&h=300&fit=crop' },
        
        // Home Goods Category
        { id: 12, name: 'Home Comfort', category: 'home', cuisines: ['Đệm'], rating: 4.6, deliveryTime: '3-5 ngày', deliveryFee: 'AED 20', minOrder: 'AED 150', reviews: 1950, image: 'https://images.unsplash.com/photo-1554995207-c18210cc9b1d?w=400&h=300&fit=crop' },
        { id: 13, name: 'Interior Bliss', category: 'home', cuisines: ['Bàn'], rating: 4.7, deliveryTime: '3-5 ngày', deliveryFee: 'AED 25', minOrder: 'AED 200', reviews: 2600, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { id: 14, name: 'Living Essentials', category: 'home', cuisines: ['Ghế'], rating: 4.8, deliveryTime: '3-5 ngày', deliveryFee: 'AED 22', minOrder: 'AED 180', reviews: 3400, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' }
    ];
}

function getMockMenu(restaurantId) {
    const menus = {
        1: [ 
            { id: 101, name: 'Margherita', description: 'Mozzarella, tomato, basil', price: 35, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop' },
            { id: 102, name: 'Pepperoni', description: 'Pepperoni pizza', price: 45, image: 'https://images.unsplash.com/photo-1628840042765-356cda07f423?w=200&h=200&fit=crop' }
        ],
        2: [
            { id: 201, name: 'Chicken Biryani', description: 'Spiced chicken with basmati rice', price: 50, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop' },
            { id: 202, name: 'Mutton Biryani', description: 'Lamb biryani', price: 60, image: 'https://images.unsplash.com/photo-1633686976498-2f96e51ee33d?w=200&h=200&fit=crop' }
        ],
        3: [
            { id: 301, name: 'Classic Burger', description: 'Beef burger with cheese', price: 30, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
            { id: 302, name: 'Fries', description: 'Golden crispy fries', price: 12, image: 'https://images.unsplash.com/photo-1585238341710-4acf3b3552e9?w=200&h=200&fit=crop' }
        ]
    };
    return menus[restaurantId] || [];
}

// Event Listeners
function setupEventListeners() {
    elements.cartButton.addEventListener('click', showCartModal);
    
    // Modal close
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Modal overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', closeModal);
    });
    
    // Checkout
    document.getElementById('checkoutButton')?.addEventListener('click', handleCheckout);
}

function handleCityChange(e) {
    state.selectedCity = e.target.value;
    loadRestaurants();
}

function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase();
    displayRestaurants();
}

function handleSort(e) {
    state.sortBy = e.target.value;
    displayRestaurants();
}

function handleCategoryFilter(e) {
    filterTags.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    state.selectedCategory = e.target.dataset.filter;
    displayRestaurants();
}

function showCartModal() {
    renderCart();
    showModal('cartModal');
}

function closeModal(e) {
    if (e) e.preventDefault();
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

function handleCheckout() {
    if (state.cart.length === 0) return;
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + DELIVERY_FEE;
    showNotification(`Đặt hàng thành công! Tổng: ${total} AED`, 'success');
    
    state.cart = [];
    updateCart();
    closeModal();
}

searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    displayRestaurants();
});

searchHeaderInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    searchInput.value = e.target.value;
    displayRestaurants();
});

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        state.selectedCategory = tag.dataset.filter;
        displayRestaurants();
    });
});

sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    displayRestaurants();
});

cartIcon.addEventListener('click', showCartModal);
modalClose.addEventListener('click', closeModal);
cartClose.addEventListener('click', closeModal);

restaurantModal.addEventListener('click', (e) => {
    if (e.target === restaurantModal) closeModal();
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) closeModal();
});

citySelect.addEventListener('change', (e) => {
    state.currentCity = e.target.value;
    loadRestaurants();
});

elements.categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        elements.categoryBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.selectedCategory = e.target.dataset.category;
        filterAndSortRestaurants();
    });
});

// API Calls - RapidAPI Talabat
async function loadRestaurants() {
    showLoading(true);
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        };

        // Call RapidAPI to get restaurants
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/restaurants?city=${state.currentCity}`,
            options
        );
        const data = await response.json();
        
        state.restaurants = Array.isArray(data) ? data : (data.restaurants || []);
        state.filteredRestaurants = [...state.restaurants];
        renderRestaurants();
        showLoading(false);
    } catch (error) {
        console.log('[v0] API Error - Using mock data:', error.message);
        state.restaurants = [];
        state.filteredRestaurants = [...state.restaurants];
        renderRestaurants();
        showLoading(false);
    }
}

async function loadRestaurantMenu(restaurantId) {
    try {
        const response = await fetch(`${API_BASE}/restaurant/${restaurantId}/menu`);
        const data = await response.json();
        return data.menu || [];
    } catch (error) {
        console.error('[v0] Error loading menu:', error);
        return [];
    }
}

// Event Handlers

// Filtering & Sorting
function filterAndSortRestaurants() {
    let filtered = [...state.restaurants];
    
    // Search filter
    if (state.searchQuery) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(state.searchQuery) ||
            r.cuisines?.some(c => c.toLowerCase().includes(state.searchQuery))
        );
    }
    
    // Category filter
    if (state.selectedCategory !== 'all') {
        const categoryMap = {
            'food': 'food',
            'fashion': 'fashion',
            'electronics': 'electronics',
            'home': 'home'
        };
        const categoryName = categoryMap[state.selectedCategory];
        filtered = filtered.filter(r => r.category === categoryName);
    }
    
    // Sort
    filtered.sort((a, b) => {
        switch(state.sortBy) {
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'delivery':
                const timeA = parseInt(a.deliveryTime?.split('-')[0]) || 999;
                const timeB = parseInt(b.deliveryTime?.split('-')[0]) || 999;
                return timeA - timeB;
            case 'price':
                const priceA = parseInt(a.minOrder?.replace(/[^0-9]/g, '')) || 0;
                const priceB = parseInt(b.minOrder?.replace(/[^0-9]/g, '')) || 0;
                return priceA - priceB;
            case 'popular':
            default:
                return (b.reviews || 0) - (a.reviews || 0);
        }
    });
    
    state.filteredRestaurants = filtered;
    renderRestaurants();
}

// ==================== DISPLAY RESTAURANTS ====================
function displayRestaurants() {
    filterAndSortRestaurants();
}

// ==================== SORT RESTAURANTS ====================
function sortRestaurants(restaurants) {
    const sorted = [...restaurants];

    switch(state.sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'delivery':
            return sorted.sort((a, b) => {
                const timeA = parseInt(a.deliveryTime);
                const timeB = parseInt(b.deliveryTime);
                return timeA - timeB;
            });
        case 'newest':
            return sorted.reverse();
        default:
            return sorted;
    }
}

// Rendering
function renderRestaurants() {
    if (state.filteredRestaurants.length === 0) {
        elements.restaurantsList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }
    
    elements.restaurantsList.style.display = 'grid';
    elements.emptyState.style.display = 'none';
    
    elements.restaurantsList.innerHTML = state.filteredRestaurants.map(restaurant => `
        <div class="restaurant-card">
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
            <div class="restaurant-body">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <div class="restaurant-rating">⭐ ${(restaurant.rating || 4.0).toFixed(1)}</div>
                </div>
                <p class="restaurant-cuisines">${restaurant.cuisines?.join(', ') || 'Various'}</p>
                <div class="restaurant-info">
                    <div class="info-item">
                        <span>🕐</span>
                        <strong>${restaurant.deliveryTime || '30-40 mins'}</strong>
                    </div>
                    <div class="info-item">
                        <span>🚚</span>
                        <strong>${restaurant.deliveryFee || 'AED 5'}</strong>
                    </div>
                    <div class="info-item">
                        <span>📍</span>
                        <strong>Min: ${restaurant.minOrder || 'AED 30'}</strong>
                    </div>
                    <div class="info-item">
                        <span>👥</span>
                        <strong>${restaurant.reviews || 0} reviews</strong>
                    </div>
                </div>
                <div class="restaurant-actions">
                    <button class="view-menu-btn" onclick="showRestaurantDetail('${restaurant.id}')">
                        Xem Menu
                    </button>
                    <button class="add-btn" onclick="quickAddRestaurant('${restaurant.id}', '${restaurant.name}')">
                        ➕
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

async function showRestaurantDetail(restaurantId) {
    const restaurant = state.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    state.selectedRestaurant = restaurant;
    const menu = await loadRestaurantMenu(restaurantId);
    
    elements.restaurantContent.innerHTML = `
        <div class="restaurant-detail">
            <div class="detail-header">
                <img src="${restaurant.image}" alt="${restaurant.name}" class="detail-image">
                <h2 class="detail-title">${restaurant.name}</h2>
                <p>${restaurant.cuisines?.join(', ') || 'Various'}</p>
                <div class="detail-meta">
                    <div class="meta-item">⭐ ${(restaurant.rating || 4.0).toFixed(1)}</div>
                    <div class="meta-item">🕐 ${restaurant.deliveryTime || '30-40 mins'}</div>
                    <div class="meta-item">🚚 ${restaurant.deliveryFee || 'AED 5'}</div>
                    <div class="meta-item">📍 Min: ${restaurant.minOrder || 'AED 30'}</div>
                </div>
            </div>
            
            <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Menu</h3>
            <div class="menu-items">
                ${menu.length > 0 ? menu.map(item => `
                    <div class="menu-item">
                        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                        <div class="menu-item-content">
                            <div class="menu-item-name">${item.name}</div>
                            <div class="menu-item-desc">${item.description}</div>
                            <div class="menu-item-footer">
                                <div class="menu-item-price">AED ${item.price}</div>
                                <button class="add-to-cart-btn" onclick="addToCart({
                                    id: '${item.id}',
                                    name: '${item.name}',
                                    price: ${item.price},
                                    image: '${item.image}',
                                    restaurantId: '${restaurant.id}',
                                    restaurantName: '${restaurant.name}'
                                })">Add</button>
                            </div>
                        </div>
                    </div>
                `).join('') : '<p style="grid-column: 1/-1;">Không có menu</p>'}
            </div>
        </div>
    `;
    
    elements.restaurantModal.classList.add('active');
}

// Cart Management
function addToCart(item) {
    const existingItem = state.cart.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} đã thêm vào giỏ hàng!`, 'success');
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateItemQuantity(itemId, quantity) {
    if (quantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = state.cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = quantity;
        updateCart();
    }
}

function updateCart() {
    elements.cartBadge.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (document.getElementById('cartModal').classList.contains('active')) {
        renderCart();
    }
}

function quickAddRestaurant(restaurantId, restaurantName) {
    const item = {
        id: `quick_${restaurantId}_${Date.now()}`,
        name: `${restaurantName} - Delivery`,
        price: DELIVERY_FEE,
        restaurantId: restaurantId,
        restaurantName: restaurantName,
        quantity: 1
    };
    addToCart(item);
}

function renderCart() {
    if (state.cart.length === 0) {
        elements.cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Giỏ hàng trống</h3>
                <p>Thêm sản phẩm để bắt đầu</p>
            </div>
        `;
        document.getElementById('checkoutButton').disabled = true;
        updateCartSummary();
        return;
    }
    
    document.getElementById('checkoutButton').disabled = false;
    elements.cartContent.innerHTML = `
        <div class="cart-items">
            ${state.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">AED ${item.price}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <div class="quantity-display">${item.quantity}</div>
                        <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = state.cart.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + delivery;
    
    document.getElementById('subtotalPrice').textContent = `${subtotal} AED`;
    document.getElementById('deliveryPrice').textContent = `${delivery} AED`;
    document.getElementById('totalPrice').textContent = `${total} AED`;
}

// Modal Management
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function showLoading(show) {
    elements.loadingSpinner.style.display = show ? 'flex' : 'none';
}

// Notification
function showNotification(message, type = 'info') {
    elements.notification.textContent = message;
    elements.notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// Utility
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}