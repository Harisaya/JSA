// Note: CONFIG, STATE, ELEMENTS, and MOCK DATA are defined in index.html
// Main.js only contains the functional code

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadRestaurants();
});

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
        { id: 12, name: 'Home Comfort', category: 'home', cuisines: ['Đệm'], rating: 4.6, deliveryTime: '3-5 ngày', deliveryFee: 'AED 20', minOrder: 'AED 150', reviews: 1950, image: 'https://images.unsplash.com/photo-1554995207-c186c61ea9bc?w=400&h=300&fit=crop' },
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
    window.elements.cartButton.addEventListener('click', showCartModal);
    
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
    window.state.selectedCity = e.target.value;
    loadRestaurants();
}

function handleSearch(e) {
    window.state.searchQuery = e.target.value.toLowerCase();
    displayRestaurants();
}

function handleSort(e) {
    window.state.sortBy = e.target.value;
    displayRestaurants();
}

function handleCategoryFilter(e) {
    window.filterTags.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    window.state.selectedCategory = e.target.dataset.filter;
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

// Utility Functions
function handleLogout() {
    localStorage.clear();
    window.location.href = 'pages/login.html';
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// All variables (state, elements, etc) are already defined in index.html
// Adding event listeners here

// Show/Hide Loading Spinner
function showLoading(show) {
    if (window.elements.loadingSpinner) {
        window.elements.loadingSpinner.style.display = show ? 'flex' : 'none';
    }
}

// API Calls - RapidAPI Talabat (with fallback to mock data)
async function loadRestaurants() {
    showLoading(true);
    
    // Simulate API delay for demo
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
        // Using mock data for now (RapidAPI Talabat requires premium)
        // In production, replace with actual API call:
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'x-rapidapi-key': RAPIDAPI_KEY,
        //         'x-rapidapi-host': RAPIDAPI_HOST
        //     }
        // };
        // const response = await fetch(`https://${RAPIDAPI_HOST}/restaurants?city=${state.currentCity}`, options);
        // const data = await response.json();
        
        window.state.restaurants = getMockRestaurants();
        window.state.filteredRestaurants = [...window.state.restaurants];
        console.log('[v0] Loaded', window.state.restaurants.length, 'restaurants');
        renderRestaurants();
    } catch (error) {
        console.log('[v0] Error loading data:', error.message);
        window.state.restaurants = getMockRestaurants();
        window.state.filteredRestaurants = [...window.state.restaurants];
        renderRestaurants();
    } finally {
        showLoading(false);
    }
}

async function loadRestaurantMenu(restaurantId) {
    try {
        const response = await fetch(`${window.API_BASE}/restaurant/${restaurantId}/menu`);
        const data = await response.json();
        return data.menu || getMockMenu(restaurantId);
    } catch (error) {
        console.error('[v0] Error loading menu:', error);
        return getMockMenu(restaurantId);
    }
}

// Event Handlers

// Filtering & Sorting
function filterAndSortRestaurants() {
    let filtered = [...window.state.restaurants];
    
    // Search filter
    if (window.state.searchQuery) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(window.state.searchQuery) ||
            r.cuisines?.some(c => c.toLowerCase().includes(window.state.searchQuery))
        );
    }
    
    // Category filter
    if (window.state.selectedCategory !== 'all') {
        const categoryMap = {
            'food': 'food',
            'fashion': 'fashion',
            'electronics': 'electronics',
            'home': 'home'
        };
        const categoryName = categoryMap[window.state.selectedCategory];
        filtered = filtered.filter(r => r.category === categoryName);
    }
    
    // Sort
    filtered.sort((a, b) => {
        switch(window.state.sortBy) {
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
    
    window.state.filteredRestaurants = filtered;
    renderRestaurants();
}

// ==================== DISPLAY RESTAURANTS ====================
function displayRestaurants() {
    filterAndSortRestaurants();
}

// ==================== SORT RESTAURANTS ====================
function sortRestaurants(restaurants) {
    const sorted = [...restaurants];

    switch(window.state.sortBy) {
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
    if (window.state.filteredRestaurants.length === 0) {
        window.elements.restaurantsList.style.display = 'none';
        window.elements.emptyState.style.display = 'block';
        return;
    }
    
    window.elements.restaurantsList.style.display = 'grid';
    window.elements.emptyState.style.display = 'none';
    
    window.elements.restaurantsList.innerHTML = window.state.filteredRestaurants.map(restaurant => `
        <a href="product-detail.html?id=${restaurant.id}" style="text-decoration:none; color:inherit;">
            <div class="restaurant-card" style="cursor:pointer;">
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
                        <button class="view-menu-btn" onclick="event.preventDefault(); showRestaurantDetail('${restaurant.id}')">
                            Xem Menu
                        </button>
                        <button class="add-btn" onclick="event.preventDefault(); addToCart({
                            id: '${restaurant.id}',
                            name: '${restaurant.name}',
                            price: 0,
                            image: '${restaurant.image}',
                            restaurantId: '${restaurant.id}',
                            restaurantName: '${restaurant.name}'
                        })">
                            ➕
                        </button>
                    </div>
                </div>
            </div>
        </a>
    `).join('');
}

// Show restaurant detail in modal
async function showRestaurantDetail(restaurantId) {
    const restaurant = window.state.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    window.state.selectedRestaurant = restaurant;
    const menu = await loadRestaurantMenu(restaurantId);
    
    window.elements.restaurantContent.innerHTML = `
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
    
    window.elements.restaurantModal.classList.add('active');
}

// Cart Management
function addToCart(item) {
    const existingItem = window.state.cart.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.state.cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} đã thêm vào giỏ hàng!`, 'success');
}

function removeFromCart(itemId) {
    window.state.cart = window.state.cart.filter(i => i.id !== itemId);
    updateCart();
    renderCart();
}

function updateQuantity(itemId, quantity) {
    const item = window.state.cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        updateCart();
        renderCart();
    }
}

function updateCart() {
    const count = window.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    window.elements.cartBadge.textContent = count;
    window.elements.cartBadge.style.display = count > 0 ? 'flex' : 'none';
}

function renderCart() {
    if (window.state.cart.length === 0) {
        window.elements.cartContent.innerHTML = '<p style="text-align: center; color: #999;">Giỏ hàng trống</p>';
        return;
    }
    
    const total = window.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + window.DELIVERY_FEE;
    
    window.elements.cartContent.innerHTML = `
        <div class="cart-list">
            ${window.state.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-content">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">AED ${item.price}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>AED ${window.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery:</span>
                <span>AED ${window.DELIVERY_FEE}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>AED ${total}</span>
            </div>
            <button id="checkoutButton" class="checkout-btn">Thanh toán</button>
        </div>
    `;
}

// UI Functions
function showModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
}

const API_BASE = 'https://rapidapi.com/'; // Replace with actual API base URL
const DELIVERY_FEE = 5; // Define DELIVERY_FEE

function handleCheckout() {
    // Checkout logic here
    showNotification('Checkout process initiated!', 'success');
}

// Declare global variables
window.state = {
    selectedCity: '',
    searchQuery: '',
    sortBy: 'popular',
    selectedCategory: 'all',
    restaurants: [],
    filteredRestaurants: [],
    cart: []
};

window.elements = {
    cartButton: document.getElementById('cartButton'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    restaurantsList: document.getElementById('restaurantsList'),
    emptyState: document.getElementById('emptyState'),
    cartContent: document.getElementById('cartContent'),
    cartBadge: document.getElementById('cartBadge'),
    restaurantContent: document.getElementById('restaurantContent'),
    restaurantModal: document.getElementById('restaurantModal')
};

window.filterTags = document.querySelectorAll('.filter-tag');
