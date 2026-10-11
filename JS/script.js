// Menu Data (English)
const menuItems = [
    { id: 1, name: "Classic Cheeseburger", category: "lunch", price: 8.99, desc: "Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Avocado Toast", category: "breakfast", price: 6.50, desc: "Sourdough bread topped with mashed avocado, poached egg, and chili flakes.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Margherita Pizza", category: "dinner", price: 11.99, desc: "Traditional Italian pizza with fresh mozzarella, tomatoes, and basil leaves.", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Chocolate Lava Cake", category: "desserts", price: 5.99, desc: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Iced Caramel Macchiato", category: "drinks", price: 4.50, desc: "Espresso combined with vanilla syrup, milk, and ice, drizzled with caramel.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Grilled Salmon Steak", category: "dinner", price: 15.99, desc: "Fresh Atlantic salmon grilled to perfection, served with asparagus and lemon butter sauce.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80" },
    { id: 7, name: "Pancake Stack", category: "breakfast", price: 7.25, desc: "Fluffy pancakes layered with maple syrup, fresh berries, and whipped butter.", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80" },
    { id: 8, name: "Caesar Salad", category: "lunch", price: 7.99, desc: "Crisp romaine lettuce, parmesan cheese, croutons, and classic Caesar dressing.", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80" },
];

let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Render Menu Items
function displayMenuItems(items) {
    if (items.length === 0) {
        menuGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No dishes found matching your search.</p>`;
        return;
    }
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-card">
            <div class="card-img-container">
                <img src="${item.img}" alt="${item.name}">
                <span class="card-badge">${item.category}</span>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="card-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="card-desc">${item.desc}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Initial Load
displayMenuItems(menuItems);

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const category = e.target.getAttribute('data-category');
        if (category === 'all') {
            displayMenuItems(menuItems);
        } else {
            const filtered = menuItems.filter(item => item.category === category);
            displayMenuItems(filtered);
        }
    });
});

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
    );
    displayMenuItems(filtered);
});

// Dark / Light Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

// Cart Modal Toggle
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});

// Add to Cart
window.addToCart = function(id) {
    const product = menuItems.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
};

// Update Cart UI
function updateCart() {
    cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: #888; margin-top: 2rem;">Your cart is empty.</p>`;
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
};

// Change Quantity
window.changeQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCart();
};

// Checkout Button Action
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you! Your order has been placed successfully.');
    cart = [];
    updateCart();
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});