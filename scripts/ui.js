const state = {
    restaurants: [],
    filteredRestaurants: [],
    selectedRestaurant: null
};

const elements = {
    restaurantsList: document.getElementById('restaurantsList'),
    emptyState: document.getElementById('emptyState'),
    restaurantContent: document.getElementById('restaurantContent')
};

// Function to load restaurant menu
async function loadRestaurantMenu(productId) {
    // Placeholder for actual implementation
    return [];
}

// Render Restaurants from Category
function renderRestaurants(restaurants) {
    state.restaurants = restaurants;
    state.filteredRestaurants = restaurants;
    renderProducts();
}

// Render Products Grid
function renderProducts() {
    if (state.filteredRestaurants.length === 0) {
        elements.restaurantsList.style.display = 'none';
        elements.emptyState.style.display = 'block';
        return;
    }
    
    elements.restaurantsList.style.display = 'grid';
    elements.emptyState.style.display = 'none';
    
    elements.restaurantsList.innerHTML = state.filteredRestaurants.map(product => `
        <div class="restaurant-card">
            <img src="${product.image}" alt="${product.name}" class="restaurant-image">
            <div class="restaurant-body">
                <div class="restaurant-header">
                    <h3 class="restaurant-name">${product.name}</h3>
                    <div class="restaurant-rating">⭐ ${(product.rating || 4.0).toFixed(1)}</div>
                </div>
                <p class="restaurant-cuisines">${product.cuisines?.join(', ') || 'Various'}</p>
                <div class="restaurant-info">
                    <div class="info-item"><span>🕐</span><strong>${product.deliveryTime || '30-40 mins'}</strong></div>
                    <div class="info-item"><span>🚚</span><strong>${product.deliveryFee || 'AED 5'}</strong></div>
                    <div class="info-item"><span>📍</span><strong>Min: ${product.minOrder || 'AED 30'}</strong></div>
                    <div class="info-item"><span>👥</span><strong>${product.reviews || 0} reviews</strong></div>
                </div>
                <div class="restaurant-actions">
                    <button class="view-menu-btn" onclick="window.showProductDetail('${product.id}')">Xem Chi Tiết</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Product Detail Modal
export async function showProductDetail(productId) {
    const product = state.restaurants.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    state.selectedRestaurant = product;
    const menu = await loadRestaurantMenu(productId);
    
    elements.restaurantContent.innerHTML = `
        <div class="restaurant-detail">
            <div class="detail-header">
                <img src="${product.image}" alt="${product.name}" class="detail-image">
                <h2 class="detail-title">${product.name}</h2>
                <p>${product.cuisines?.join(', ') || 'Various'}</p>
                <div class="detail-meta">
                    <div class="meta-item">⭐ ${(product.rating || 4.0).toFixed(1)}</div>
                    <div class="meta-item">🕐 ${product.deliveryTime || '30-40 mins'}</div>
                    <div class="meta-item">🚚 ${product.deliveryFee || 'AED 5'}</div>
                    <div class="meta-item">📍 Min: ${product.minOrder || 'AED 30'}</div>
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
                                <button class="add-to-cart-btn" onclick="window.addToCart({id: '${item.id}', name: '${item.name}', price: ${item.price}, image: '${item.image}', productName: '${product.name}'})">Add</button>
                            </div>
                        </div>
                    </div>
                `).join('') : '<p style="grid-column: 1/-1;">No items</p>'}
            </div>
        </div>
    `;
    
    showModal('restaurantModal');
}

// Modal Control
export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

export function closeModal() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Expose globally
window.showProductDetail = showProductDetail;
window.closeModal = closeModal;
