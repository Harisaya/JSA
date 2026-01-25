const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY_HERE';
const RAPIDAPI_HOST = 'talabat.p.rapidapi.com';
const DELIVERY_FEE = 5;
const CITIES_MAPPING = {
    'Dubai': 'Dubai',
    'Abu Dhabi': 'Abu Dhabi',
    'Sharjah': 'Sharjah'
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

// Global State
const state = {
    restaurants: [],
    filteredRestaurants: [],
    selectedRestaurant: null,
    cart: [],
    currentCity: 'Dubai',
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'popular'
};
