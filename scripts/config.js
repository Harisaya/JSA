// ==================== API CONFIGURATION ====================
// RapidAPI / Talabat configuration — enable to fetch real products
const RAPIDAPI_KEY = 'f95461abeemsh6e3039e52116ac7p152f3ajsnd300217a2f54';
const RAPIDAPI_HOST = 'talabat.p.rapidapi.com';
const API_BASE = 'https://api.example.com';
const API_TIMEOUT = 10000; // 10 seconds
// Toggle between real API and mock data (false = use mock data, true = use API)
const USE_API = true;
const DH_VENDOR_ID = 'f0144add-5e28-4c15-aa22-65d8225f3eb7'; // Talabat vendor ID for groceries

// ==================== APP CONFIGURATION ====================
const APP_CONFIG = {
    // Delivery
    DELIVERY_FEE: 5,
    MIN_ORDER_AMOUNT: 20,
    
    // Currency
    CURRENCY: 'AED',
    CURRENCY_SYMBOL: 'AED',
    
    // Time zones
    TIMEZONE: 'Asia/Dubai',
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    
    // API Rate Limiting
    API_RATE_LIMIT_DELAY: 500, // ms between requests
    API_MAX_RETRIES: 3,
    
    // Cache duration
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    
    // Order statuses
    ORDER_STATUSES: {
        PENDING: 'Pending',
        CONFIRMED: 'Confirmed',
        PREPARING: 'Preparing',
        ON_THE_WAY: 'On the way',
        DELIVERED: 'Delivered',
        CANCELLED: 'Cancelled'
    },
    
    // Payment methods
    PAYMENT_METHODS: {
        CASH: 'cash',
        CARD: 'card',
        WALLET: 'wallet',
        PAYPAL: 'paypal'
    }
};

// ==================== CITIES MAPPING ====================
const CITIES_MAPPING = {
    'Dubai': 'Dubai',
    'Abu Dhabi': 'Abu Dhabi',
    'Sharjah': 'Sharjah',
    'Ajman': 'Ajman',
    'Ras Al Khaimah': 'Ras Al Khaimah'
};

// ==================== CATEGORIES ====================
const CATEGORIES = {
    FOOD: { id: 'food', name: 'Thức ăn', icon: '🍔', color: '#FF6B6B' },
    FASHION: { id: 'fashion', name: 'Thời trang', icon: '👕', color: '#4ECDC4' },
    ELECTRONICS: { id: 'electronics', name: 'Điện tử', icon: '📱', color: '#45B7D1' },
    HOME: { id: 'home', name: 'Gia dụng', icon: '🛋️', color: '#FFA07A' }
};

// ==================== CUISINES ====================
const CUISINES_LIST = [
    'Pizza',
    'Asian',
    'Fast Food',
    'Desserts',
    'Japanese',
    'Indian',
    'Italian',
    'Chinese',
    'Thai',
    'Vietnamese',
    'Burger',
    'Sandwich'
];

// ==================== ERROR MESSAGES ====================
const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    API_ERROR: 'API error occurred. Please try again later.',
    INVALID_INPUT: 'Invalid input. Please check your data.',
    NOT_FOUND: 'Resource not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access forbidden.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT: 'Request timeout. Please try again.',
    INVALID_COUPON: 'Invalid or expired coupon code.',
    MIN_ORDER_NOT_MET: 'Order amount is below the minimum required.'
};

// ==================== SUCCESS MESSAGES ====================
const SUCCESS_MESSAGES = {
    ITEM_ADDED: 'Item added to cart successfully!',
    ITEM_REMOVED: 'Item removed from cart.',
    ORDER_PLACED: 'Order placed successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    ADDRESS_ADDED: 'Address added successfully!',
    PAYMENT_SUCCESS: 'Payment processed successfully!',
    REVIEW_ADDED: 'Review added successfully!'
};

// ==================== DOM ELEMENTS ====================
const elements = {
    // Navigation
    citySelect: document.getElementById('citySelect'),
    headerSearch: document.getElementById('headerSearch'),
    mainSearch: document.getElementById('mainSearch'),
    
    // Filters
    sortSelect: document.getElementById('sortSelect'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    
    // Display areas
    restaurantsList: document.getElementById('restaurantsList'),
    loadingSpinner: document.getElementById('loading'),
    emptyState: document.getElementById('emptyState'),
    
    // Cart
    cartButton: document.getElementById('cartButton'),
    cartBadge: document.getElementById('cartBadge'),
    
    // Modals
    restaurantModal: document.getElementById('restaurantModal'),
    restaurantContent: document.getElementById('restaurantContent'),
    cartModal: document.getElementById('cartModal'),
    cartContent: document.getElementById('cartContent'),
    
    // Notifications
    notification: document.getElementById('notification')
};

// ==================== GLOBAL STATE ====================
const state = {
    // Data
    restaurants: [],
    filteredRestaurants: [],
    selectedRestaurant: null,
    cart: [],
    
    // Filters
    currentCity: 'Dubai',
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'popular',
    
    // User
    userId: localStorage.getItem('userId') || null,
    isLoggedIn: !!localStorage.getItem('authToken'),
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    
    // UI
    isLoading: false,
    currentPage: 1
};

// ==================== LOCAL STORAGE KEYS ====================
const STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    USER_ID: 'userId',
    USER_DATA: 'userData',
    FAVORITES: 'favorites',
    CART: 'cart',
    RECENT_SEARCHES: 'recentSearches',
    ADDRESSES: 'addresses',
    PREFERENCES: 'preferences'
};

// ==================== API ENDPOINTS ====================
const API_ENDPOINTS = {
    // Products
    PRODUCT_SEARCH: '/product-search',
    CATEGORIES: '/categories',
    PRODUCT_DETAIL: (id) => `/products/${id}`,
    
    // Restaurants
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAIL: (id) => `/restaurants/${id}`,
    RESTAURANT_MENU: (id) => `/restaurants/${id}/menu`,
    
    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id) => `/orders/${id}`,
    ORDER_TRACKING: (id) => `/orders/${id}/tracking`,
    
    // Users
    USER_PROFILE: (id) => `/users/${id}`,
    USER_ORDERS: (id) => `/users/${id}/orders`,
    USER_ADDRESSES: (id) => `/users/${id}/addresses`,
    USER_FAVORITES: (id) => `/users/${id}/favorites`,
    
    // Reviews
    REVIEWS: '/reviews',
    RESTAURANT_REVIEWS: (id) => `/restaurants/${id}/reviews`,
    
    // Payments
    PAYMENT_PROCESS: '/payments',
    COUPON_VALIDATE: '/coupons/validate',
    
    // Other
    RECOMMENDATIONS: '/recommendations',
    NOTIFICATIONS: (id) => `/users/${id}/notifications`
};

// ==================== LOGGING CONFIGURATION ====================
const LOG_CONFIG = {
    ENABLED: true,
    LEVEL: 'debug', // 'debug', 'info', 'warn', 'error'
    PREFIX: '[JSA]'
};

// ==================== UTILITY FUNCTION: Logger ====================
const Logger = {
    debug: (message, data = null) => {
        if (LOG_CONFIG.ENABLED && LOG_CONFIG.LEVEL === 'debug') {
            console.log(`${LOG_CONFIG.PREFIX} ${message}`, data || '');
        }
    },
    info: (message, data = null) => {
        if (LOG_CONFIG.ENABLED) {
            console.info(`${LOG_CONFIG.PREFIX} ${message}`, data || '');
        }
    },
    warn: (message, data = null) => {
        if (LOG_CONFIG.ENABLED) {
            console.warn(`${LOG_CONFIG.PREFIX} ${message}`, data || '');
        }
    },
    error: (message, data = null) => {
        if (LOG_CONFIG.ENABLED) {
            console.error(`${LOG_CONFIG.PREFIX} ${message}`, data || '');
        }
    }
};