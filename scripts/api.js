// ==================== MOCK DATA ====================
function getMockRestaurants() {
    return [
        { id: 1, name: 'Pizza Paradise', category: 'food', cuisines: ['Pizza'], rating: 4.8, deliveryTime: '25-35 mins', deliveryFee: 'AED 5', minOrder: 'AED 25', reviews: 1250, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop' },
        { id: 2, name: 'Biryani House', category: 'food', cuisines: ['Asian'], rating: 4.6, deliveryTime: '30-40 mins', deliveryFee: 'AED 4', minOrder: 'AED 30', reviews: 980, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
        { id: 3, name: 'Burger Barn', category: 'food', cuisines: ['Fast Food'], rating: 4.5, deliveryTime: '20-30 mins', deliveryFee: 'AED 3', minOrder: 'AED 20', reviews: 2100, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
        { id: 4, name: 'Sweet Cakes', category: 'food', cuisines: ['Desserts'], rating: 4.9, deliveryTime: '15-25 mins', deliveryFee: 'AED 2', minOrder: 'AED 15', reviews: 750, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
        { id: 5, name: 'Sushi Master', category: 'food', cuisines: ['Asian'], rating: 4.7, deliveryTime: '35-45 mins', deliveryFee: 'AED 6', minOrder: 'AED 35', reviews: 890, image: 'https://images.unsplash.com/photo-1553861519-cdde9b8ec4a5?w=400&h=300&fit=crop' },
        { id: 6, name: 'Style Hub', category: 'fashion', cuisines: ['Clothing'], rating: 4.7, deliveryTime: '1-2 days', deliveryFee: 'AED 8', minOrder: 'AED 50', reviews: 2340, image: 'https://images.unsplash.com/photo-1554521722-7be0672eef4d?w=400&h=300&fit=crop' },
        { id: 9, name: 'Tech Store', category: 'electronics', cuisines: ['Electronics'], rating: 4.9, deliveryTime: '2-3 days', deliveryFee: 'AED 15', minOrder: 'AED 200', reviews: 4500, image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=300&fit=crop' },
        { id: 12, name: 'Home Comfort', category: 'home', cuisines: ['Furniture'], rating: 4.6, deliveryTime: '3-5 days', deliveryFee: 'AED 20', minOrder: 'AED 150', reviews: 1950, image: 'https://images.unsplash.com/photo-1554995207-c186c61ea9bc?w=400&h=300&fit=crop' }
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
        ]
    };
    return menus[restaurantId] || [];
}// ==================== SEARCH API ====================
async function searchProducts(query, category = null) {
    try {
        console.log('[API] Searching products:', query);
        
        const params = new URLSearchParams({
            query: query,
            country: 'uae'
        });
        if (category) params.append('category', category);
        
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/product-search?${params}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('[API] Search error:', error.message);
        console.log('[API] Using mock data as fallback for search...');
        let results = getMockRestaurants();
        if (query) {
            results = results.filter(r => 
                r.name.toLowerCase().includes(query.toLowerCase()) ||
                r.cuisines?.some(c => c.toLowerCase().includes(query.toLowerCase()))
            );
        }
        if (category) {
            results = results.filter(r => r.category === category);
        }
        return results;
    }
}

// ==================== GET CATEGORIES ====================
async function getCategories() {
    try {
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/categories`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('[API] Categories error:', error.message);
        console.log('[API] Using mock categories as fallback...');
        return [
            { id: 'food', name: 'Food', icon: '🍔' },
            { id: 'fashion', name: 'Fashion', icon: '👕' },
            { id: 'electronics', name: 'Electronics', icon: '📱' },
            { id: 'home', name: 'Home', icon: '🛋️' }
        ];
    }
}

// ==================== FILTER PRODUCTS ====================
async function filterProducts(filters) {
    try {
        console.log('[API] Filtering products:', filters);
        
        const params = new URLSearchParams({
            country: 'uae'
        });
        
        if (filters.category) params.append('category', filters.category);
        if (filters.priceMin) params.append('priceMin', filters.priceMin);
        if (filters.priceMax) params.append('priceMax', filters.priceMax);
        if (filters.rating) params.append('minRating', filters.rating);
        
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/product-search?${params}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('[API] Filter error:', error.message);
        console.log('[API] Using mock data for filters...');
        let results = getMockRestaurants();
        if (filters.category) {
            results = results.filter(r => r.category === filters.category);
        }
        return results;
    }
}

// ==================== GET RESTAURANT/PRODUCT DETAIL ====================
async function getRestaurantDetail(restaurantId) {
    try {
        console.log('[API] Getting restaurant detail:', restaurantId);
        
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/restaurant/${restaurantId}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Restaurant detail error:', error.message);
        console.log('[API] Using mock restaurant as fallback...');
        return null;
    }
}

// ==================== GET RESTAURANT MENU ====================
async function loadRestaurantMenu(restaurantId) {
    try {
        console.log('[API] Loading menu for restaurant:', restaurantId);
        
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/restaurant/${restaurantId}/menu`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return data.menu || [];
    } catch (error) {
        console.error('[API] Menu error:', error.message);
        console.log('[API] Using mock menu as fallback...');
        return getMockMenu(restaurantId);
    }
}

// ==================== PLACE ORDER ====================
async function placeOrder(orderData) {
    try {
        console.log('[API] Placing order:', orderData);
        
        const response = await fetch(
            `${API_BASE}/orders`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                },
                body: JSON.stringify(orderData)
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return {
            success: true,
            orderId: data.orderId,
            totalAmount: data.totalAmount,
            estimatedTime: data.estimatedDeliveryTime
        };
    } catch (error) {
        console.error('[API] Order placement error:', error.message);
        console.log('[API] Using mock order as fallback...');
        return {
            success: true,
            orderId: 'MOCK_' + Math.random().toString(36).substr(2, 9),
            totalAmount: orderData.totalAmount || 0,
            estimatedTime: '30-40 mins'
        };
    }
}

// ==================== GET USER ORDERS ====================
async function getUserOrders(userId) {
    try {
        console.log('[API] Getting orders for user:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/orders`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Get orders error:', error.message);
        console.log('[API] Using empty orders as fallback...');
        return [];
    }
}

// ==================== GET ORDER TRACKING ====================
async function getOrderTracking(orderId) {
    try {
        console.log('[API] Getting order tracking:', orderId);
        
        const response = await fetch(
            `${API_BASE}/orders/${orderId}/tracking`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Order tracking error:', error.message);
        console.log('[API] Using mock tracking as fallback...');
        return null;
    }
}

// ==================== ADD REVIEW ====================
async function addReview(restaurantId, reviewData) {
    try {
        console.log('[API] Adding review for restaurant:', restaurantId);
        
        const response = await fetch(
            `${API_BASE}/restaurants/${restaurantId}/reviews`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                },
                body: JSON.stringify(reviewData)
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Add review error:', error.message);
        console.log('[API] Using failed review fallback...');
        return { success: false };
    }
}

// ==================== GET RECOMMENDATIONS ====================
async function getRecommendations(userId, category = null) {
    try {
        console.log('[API] Getting recommendations for user:', userId);
        
        const params = new URLSearchParams({ userId });
        if (category) params.append('category', category);
        
        const response = await fetch(
            `${API_BASE}/recommendations?${params}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Recommendations error:', error.message);
        console.log('[API] Using mock recommendations as fallback...');
        return getMockRestaurants().slice(0, 3);
    }
}

// ==================== LOAD ALL RESTAURANTS (Main Function) ====================
async function loadRestaurants(category = 'all') {
    showLoading(true);
    
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        };
        
        console.log('[API] Fetching products from API...');
        
        const response = await fetch(
            `https://${RAPIDAPI_HOST}/product-search?category=groceries&dhVendorId=f0144add-5e28-4c15-aa22-65d8225f3eb7&country=uae&query=shop`,
            options
        );
        
        console.log('[API] API Response Status:', response.status);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('[API] API Response:', data);
        
        let items = [];
        if (data.data && Array.isArray(data.data)) {
            items = data.data;
        } else if (data.data && typeof data.data === 'object') {
            const possibleArrays = Object.values(data.data).find(val => Array.isArray(val));
            if (possibleArrays) {
                items = possibleArrays;
            }
        }
        
        if (items.length > 0) {
            state.restaurants = items.map((item, idx) => ({
                id: item.id || idx,
                name: item.name || item.title || 'Product',
                category: 'groceries',
                cuisines: [item.category || 'Grocery Items'],
                rating: item.rating || 4.5,
                deliveryTime: '30-40 mins',
                deliveryFee: 'AED 5',
                minOrder: 'AED 30',
                reviews: item.reviewCount || 0,
                image: item.imageUrl || item.image || 'https://via.placeholder.com/400x300',
                price: item.price || 0
            }));
            console.log('[API] Successfully loaded', state.restaurants.length, 'products from API');
        } else {
            throw new Error('No items found in API response');
        }
        
        state.filteredRestaurants = [...state.restaurants];
        renderRestaurants();
    } catch (error) {
        console.error('[API] Error loading restaurants:', error.message);
        console.log('[API] Using mock restaurants as fallback...');
        state.restaurants = getMockRestaurants();
        state.filteredRestaurants = [...state.restaurants];
        renderRestaurants();
    } finally {
        showLoading(false);
    }
}

// ==================== USER MANAGEMENT API ====================
async function getUserProfile(userId) {
    try {
        console.log('[API] Getting user profile:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] User profile error:', error.message);
        console.log('[API] Using mock profile as fallback...');
        return null;
    }
}

// ==================== FAVORITES API ====================
async function toggleFavorite(restaurantId, userId) {
    try {
        console.log('[API] Toggling favorite:', restaurantId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/favorites/${restaurantId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Toggle favorite error:', error.message);
        console.log('[API] Using failed favorite fallback...');
        return { success: false };
    }
}

async function getFavorites(userId) {
    try {
        console.log('[API] Getting favorites for user:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/favorites`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Get favorites error:', error.message);
        console.log('[API] Using empty favorites as fallback...');
        return [];
    }
}

// ==================== ADDRESSES API ====================
async function getUserAddresses(userId) {
    try {
        console.log('[API] Getting addresses for user:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/addresses`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Get addresses error:', error.message);
        console.log('[API] Using empty addresses as fallback...');
        return [];
    }
}

async function addAddress(userId, addressData) {
    try {
        console.log('[API] Adding address for user:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/addresses`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                },
                body: JSON.stringify(addressData)
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Add address error:', error.message);
        console.log('[API] Using failed address fallback...');
        return { success: false, message: 'Could not add address' };
    }
}

// ==================== PAYMENT API ====================
async function processPayment(paymentData) {
    try {
        console.log('[API] Processing payment...');
        
        const response = await fetch(
            `${API_BASE}/payments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                },
                body: JSON.stringify(paymentData)
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Payment error:', error.message);
        console.log('[API] Using failed payment fallback...');
        return { success: false };
    }
}

// ==================== PROMO & COUPON API ====================
async function validateCoupon(couponCode) {
    try {
        console.log('[API] Validating coupon:', couponCode);
        
        const response = await fetch(
            `${API_BASE}/coupons/validate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                },
                body: JSON.stringify({ code: couponCode })
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Coupon validation error:', error.message);
        console.log('[API] Using invalid coupon fallback...');
        return { valid: false };
    }
}

// ==================== NOTIFICATION API ====================
async function getNotifications(userId) {
    try {
        console.log('[API] Getting notifications for user:', userId);
        
        const response = await fetch(
            `${API_BASE}/users/${userId}/notifications`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('[API] Get notifications error:', error.message);
        console.log('[API] Using empty notifications as fallback...');
        return [];
    }
}

// ==================== HELPER FUNCTIONS ====================
function formatPrice(amount) {
    return `AED ${amount.toFixed(2)}`;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US');
}

function formatDeliveryTime(minutes) {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Rate limiting helper
const apiCallLimiter = {
    lastCalls: {},
    isAllowed(key, delayMs = 1000) {
        const now = Date.now();
        const lastCall = this.lastCalls[key] || 0;
        if (now - lastCall < delayMs) {
            return false;
        }
        this.lastCalls[key] = now;
        return true;
    }
};

// Error handler helper
function handleApiError(error, fallbackValue = null) {
    console.error('[API] Error occurred:', error);
    
    if (error.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = 'pages/login.html';
    } else if (error.status === 403) {
        // Forbidden
        showNotification('Access denied', 'error');
    } else if (error.status === 404) {
        // Not found
        showNotification('Resource not found', 'error');
    } else if (error.status === 500) {
        // Server error
        showNotification('Server error. Please try again later', 'error');
    } else {
        showNotification('An error occurred. Please try again', 'error');
    }
    
    return fallbackValue;
}
