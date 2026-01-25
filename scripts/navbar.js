// Navbar is now in HTML, handle click events here
document.addEventListener('DOMContentLoaded', () => {
    const navbarItems = document.querySelectorAll('.navbar-item');

    navbarItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;

            // Update active state
            navbarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update category buttons in filters section
            const categoryBtns = document.querySelectorAll('.category-btn');
            categoryBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });

            // Update state and filter
            if (window.state) {
                window.state.selectedCategory = category;
            }

            // Trigger filter
            if (window.filterAndSortRestaurants) {
                window.filterAndSortRestaurants();
            }

            // Store active category
            localStorage.setItem('activeCategory', category);
        });
    });
});
