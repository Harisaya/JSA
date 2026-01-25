let state = {
    restaurants: [],
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'popular',
    currentCity: ''
};

// Declare renderProducts function
function renderProducts() {
    console.log('Rendering products...');
    // Product rendering logic here
}

// Filter and Sort
function filterAndSort() {
    let filtered = [...state.restaurants];
    
    // Search filter
    if (state.searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(state.searchQuery) ||
            p.cuisines?.some(c => c.toLowerCase().includes(state.searchQuery))
        );
    }
    
    // Category filter
    if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === state.selectedCategory);
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
    renderProducts();
}

// Handle Filters
function handleSearch(query) {
    state.searchQuery = query.toLowerCase();
    filterAndSort();
}

export function handleCategoryFilter(category) {
    state.selectedCategory = category;
    filterAndSort();
}

export function handleSort(sortType) {
    state.sortBy = sortType;
    filterAndSort();
}

export function handleCityChange(city) {
    state.currentCity = city;
    state.searchQuery = '';
    filterAndSort();
}

// Expose globally
window.handleSearch = handleSearch;
window.handleCategoryFilter = handleCategoryFilter;
window.handleSort = handleSort;
window.handleCityChange = handleCityChange;
