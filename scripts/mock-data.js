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
        { id: 14, name: 'Living Essentials', category: 'home', cuisines: ['Ghế'], rating: 4.8, deliveryTime: '3-5 ngày', deliveryFee: 'AED 22', minOrder: 'AED 180', reviews: 3400, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        
        // Medicine Category
        { id: 15, name: 'PharmaCare', category: 'medicine', cuisines: ['Vitamin'], rating: 4.9, deliveryTime: '30-45 mins', deliveryFee: 'AED 3', minOrder: 'AED 20', reviews: 3450, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=400&h=300&fit=crop' },
        { id: 16, name: 'Health Plus', category: 'medicine', cuisines: ['Thuốc'], rating: 4.7, deliveryTime: '45-60 mins', deliveryFee: 'AED 4', minOrder: 'AED 30', reviews: 2100, image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop' },
        
        // Beauty Category
        { id: 17, name: 'Beauty Glow', category: 'beauty', cuisines: ['Skincare'], rating: 4.8, deliveryTime: '1-2 ngày', deliveryFee: 'AED 6', minOrder: 'AED 40', reviews: 2890, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop' },
        { id: 18, name: 'Makeup Studio', category: 'beauty', cuisines: ['Makeup'], rating: 4.6, deliveryTime: '1-2 ngày', deliveryFee: 'AED 7', minOrder: 'AED 50', reviews: 1980, image: 'https://images.unsplash.com/photo-1599599810694-b3a7f1d88416?w=400&h=300&fit=crop' },
        
        // Accessories Category
        { id: 19, name: 'Fashion Corner', category: 'accessories', cuisines: ['Túi'], rating: 4.7, deliveryTime: '1-2 ngày', deliveryFee: 'AED 8', minOrder: 'AED 55', reviews: 2340, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop' },
        { id: 20, name: 'Accessory Hub', category: 'accessories', cuisines: ['Trang sức'], rating: 4.5, deliveryTime: '1-2 ngày', deliveryFee: 'AED 9', minOrder: 'AED 60', reviews: 1650, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop' },
        
        // Sports Category
        { id: 21, name: 'Sports Zone', category: 'sports', cuisines: ['Giày'], rating: 4.8, deliveryTime: '2-3 ngày', deliveryFee: 'AED 12', minOrder: 'AED 100', reviews: 3200, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
        { id: 22, name: 'Athlete Store', category: 'sports', cuisines: ['Quần áo'], rating: 4.6, deliveryTime: '2-3 ngày', deliveryFee: 'AED 11', minOrder: 'AED 90', reviews: 2100, image: 'https://images.unsplash.com/photo-1518611505868-48b60c3ec1d3?w=400&h=300&fit=crop' }
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
