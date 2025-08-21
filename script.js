// ShopZone E-commerce JavaScript

// Global Variables
let products = [];
let cart = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 8;

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        rating: 4.5,
        reviews: 128,
        inStock: true
    },
    {
        id: 2,
        name: "Smartphone 128GB",
        price: 699.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Latest smartphone with advanced camera system and lightning-fast performance.",
        rating: 4.8,
        reviews: 342,
        inStock: true
    },
    {
        id: 3,
        name: "Casual Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
        rating: 4.2,
        reviews: 89,
        inStock: true
    },
    {
        id: 4,
        name: "JavaScript Programming Book",
        price: 39.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Comprehensive guide to modern JavaScript programming with practical examples.",
        rating: 4.7,
        reviews: 156,
        inStock: true
    },
    {
        id: 5,
        name: "Indoor Plant Collection",
        price: 49.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Beautiful collection of indoor plants to brighten up your living space.",
        rating: 4.4,
        reviews: 73,
        inStock: true
    },
    {
        id: 6,
        name: "Gaming Laptop",
        price: 1299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "High-performance gaming laptop with RTX graphics and RGB keyboard.",
        rating: 4.6,
        reviews: 94,
        inStock: true
    },
    {
        id: 7,
        name: "Designer Jeans",
        price: 89.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Premium quality designer jeans with perfect fit and comfort.",
        rating: 4.3,
        reviews: 67,
        inStock: true
    },
    {
        id: 8,
        name: "Cooking Masterclass Book",
        price: 29.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Learn professional cooking techniques from world-renowned chefs.",
        rating: 4.5,
        reviews: 112,
        inStock: true
    },
    {
        id: 9,
        name: "Smart Watch",
        price: 249.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Feature-rich smartwatch with health monitoring and GPS tracking.",
        rating: 4.4,
        reviews: 203,
        inStock: true
    },
    {
        id: 10,
        name: "Yoga Mat",
        price: 34.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Non-slip yoga mat perfect for home workouts and meditation.",
        rating: 4.6,
        reviews: 145,
        inStock: true
    },
    {
        id: 11,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Warm and stylish winter jacket with water-resistant coating.",
        rating: 4.7,
        reviews: 88,
        inStock: true
    },
    {
        id: 12,
        name: "Digital Photography Guide",
        price: 34.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Complete guide to digital photography for beginners and professionals.",
        rating: 4.8,
        reviews: 167,
        inStock: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    displayProducts();
});

// Initialize application
function initializeApp() {
    products = [...sampleProducts];
    filteredProducts = [...products];
    loadCartFromStorage();
    updateCartUI();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.closest('form').addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }

    // Category filtering
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }

    // Sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Load more products
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Navigation dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item[data-category]');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterByCategory(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// Load products (in a real app, this would be an API call)
function loadProducts() {
    // Simulate API loading delay
    setTimeout(() => {
        displayProducts();
    }, 100);
}

// Display products
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(0, endIndex);

    if (currentPage === 1) {
        productsContainer.innerHTML = '';
    }

    productsToShow.slice(startIndex).forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (endIndex >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Add animation to new products
    const newProducts = productsContainer.querySelectorAll('.product-card:not(.animated)');
    newProducts.forEach((card, index) => {
        card.classList.add('animated', 'fade-in-up');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Create product card
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    const stars = generateStarRating(product.rating);
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <div class="product-image">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
            </div>
            <div class="card-body d-flex flex-column">
                <h6 class="card-title">${product.name}</h6>
                <div class="product-rating mb-2">
                    ${stars}
                    <small class="text-muted ms-1">(${product.reviews})</small>
                </div>
                <p class="card-text flex-grow-1">${product.description.substring(0, 80)}...</p>
                <div class="mt-auto">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <span class="badge bg-success">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-sm btn-add-to-cart" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus me-1"></i>Add to Cart
                        </button>
                        <button class="btn btn-outline-primary btn-sm" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye me-1"></i>Quick View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search functionality
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1;
    displayProducts();
}

// Category filtering
function handleCategoryFilter() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    filterByCategory(selectedCategory);
}

function filterByCategory(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    // Update the select element
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
    }
    
    currentPage = 1;
    displayProducts();
}

// Sorting functionality
function handleSort() {
    const sortBy = document.getElementById('sortSelect').value;
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts = [...products];
            break;
    }
    
    currentPage = 1;
    displayProducts();
}

// Load more products
function loadMoreProducts() {
    currentPage++;
    displayProducts();
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showToast(`${product.name} added to cart!`, 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    displayCartItems();
}

// Update quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCartToStorage();
        updateCartUI();
        displayCartItems();
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    if (cartTotal) {
        cartTotal.textContent = totalPrice.toFixed(2);
    }
    
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// Display cart items in modal
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
            <div class="flex-grow-1">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-muted mb-1">$${item.price.toFixed(2)} each</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="btn btn-sm btn-outline-danger mt-1" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    if (modalTitle) {
        modalTitle.textContent = product.name;
    }
    
    if (modalBody) {
        const stars = generateStarRating(product.rating);
        
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-6">
                    <div class="product-rating mb-3">
                        ${stars}
                        <span class="ms-2">${product.rating}/5 (${product.reviews} reviews)</span>
                    </div>
                    <h4 class="product-price mb-3">$${product.price.toFixed(2)}</h4>
                    <p class="mb-3">${product.description}</p>
                    <div class="mb-3">
                        <span class="badge bg-primary">${product.category}</span>
                        <span class="badge bg-success ms-2">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }
    
    // Simulate checkout process
    showToast('Redirecting to checkout...', 'info');
    
    // In a real application, this would redirect to a secure checkout page
    setTimeout(() => {
        alert('Thank you for your purchase! This is a demo checkout.');
        cart = [];
        saveCartToStorage();
        updateCartUI();
        displayCartItems();
        
        // Hide the cart modal
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        if (cartModal) {
            cartModal.hide();
        }
    }, 1500);
}

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('shopzone_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shopzone_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-bg-${type}" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

// Update cart modal when it's shown
document.getElementById('cartModal').addEventListener('show.bs.modal', function() {
    displayCartItems();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});