const state = {
    cart: []
};

const elements = {
    cartBadge: document.getElementById('cartBadge'),
    cartContent: document.getElementById('cartContent')
};

const DELIVERY_FEE = 5; // Example delivery fee

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal() {
    document.querySelectorAll('.modal.active').forEach(modal => modal.classList.remove('active'));
}

function showNotification(message, type) {
    console.log(`${type}: ${message}`);
}

// Add to Cart
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

// Remove from Cart
function removeFromCart(itemId) {
    state.cart = state.cart.filter(item => item.id !== itemId);
    updateCart();
}

// Update Item Quantity
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

// Update Cart
function updateCart() {
    if (elements.cartBadge) {
        elements.cartBadge.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    if (document.getElementById('cartModal')?.classList.contains('active')) {
        renderCart();
    }
}

// Render Cart
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
                        <button class="quantity-btn" onclick="window.updateItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <div class="quantity-display">${item.quantity}</div>
                        <button class="quantity-btn" onclick="window.updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="window.removeFromCart('${item.id}')">Delete</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    updateCartSummary();
}

// Update Cart Summary
export function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = state.cart.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal + delivery;
    
    document.getElementById('subtotalPrice').textContent = `${subtotal} AED`;
    document.getElementById('deliveryPrice').textContent = `${delivery} AED`;
    document.getElementById('totalPrice').textContent = `${total} AED`;
}

// Show Cart Modal
export function showCartModal() {
    renderCart();
    showModal('cartModal');
}

// Checkout
export function handleCheckout() {
    if (state.cart.length === 0) return;
    
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + DELIVERY_FEE;
    showNotification(`Đặt hàng thành công! Tổng: ${total} AED`, 'success');
    
    state.cart = [];
    updateCart();
    window.closeModal();
}

// Expose globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateItemQuantity = updateItemQuantity;
window.showCartModal = showCartModal;
window.handleCheckout = handleCheckout;
window.showModal = showModal;
window.closeModal = closeModal;
window.showNotification = showNotification;
