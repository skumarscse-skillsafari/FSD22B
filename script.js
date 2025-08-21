// ShopEase E-commerce Website JavaScript

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        rating: 4.5,
        reviews: 128,
        isNew: false,
        onSale: true
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity. Track your health goals effectively.",
        rating: 4.7,
        reviews: 89,
        isNew: true,
        onSale: true
    },
    {
        id: 3,
        name: "Designer Leather Handbag",
        category: "fashion",
        price: 149.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Elegant leather handbag crafted from premium materials. Perfect for both casual and formal occasions.",
        rating: 4.3,
        reviews: 67,
        isNew: false,
        onSale: false
    },
    {
        id: 4,
        name: "Modern Table Lamp",
        category: "home",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Stylish modern table lamp with adjustable brightness. Perfect for reading and ambient lighting.",
        rating: 4.2,
        reviews: 45,
        isNew: false,
        onSale: true
    },
    {
        id: 5,
        name: "Casual Cotton T-Shirt",
        category: "fashion",
        price: 24.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Comfortable 100% cotton t-shirt available in multiple colors. Perfect for everyday wear.",
        rating: 4.4,
        reviews: 156,
        isNew: true,
        onSale: false
    },
    {
        id: 6,
        name: "Gaming Mechanical Keyboard",
        category: "electronics",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "RGB backlit mechanical keyboard with customizable keys. Perfect for gaming and professional use.",
        rating: 4.6,
        reviews: 203,
        isNew: false,
        onSale: true
    },
    {
        id: 7,
        name: "Cozy Throw Blanket",
        category: "home",
        price: 39.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Ultra-soft throw blanket perfect for cozy nights. Made from premium microfiber material.",
        rating: 4.8,
        reviews: 92,
        isNew: true,
        onSale: false
    },
    {
        id: 8,
        name: "Running Sneakers",
        category: "fashion",
        price: 119.99,
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Lightweight running shoes with advanced cushioning technology. Perfect for athletes and fitness enthusiasts.",
        rating: 4.5,
        reviews: 174,
        isNew: false,
        onSale: true
    },
    {
        id: 9,
        name: "Ceramic Coffee Mug Set",
        category: "home",
        price: 29.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Set of 4 elegant ceramic coffee mugs. Perfect for your morning coffee or tea time.",
        rating: 4.1,
        reviews: 38,
        isNew: false,
        onSale: false
    }
];

// Shopping cart array
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    setupEventListeners();
    loadCartFromStorage();
});

// Load products into the grid
function loadProducts(filter = 'all', searchTerm = '') {
    let filteredProducts = products;

    // Filter by category
    if (filter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === filter);
    }

    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Clear the grid
    productsGrid.innerHTML = '';

    // Add products to grid
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        
        // Add animation delay
        setTimeout(() => {
            productCard.classList.add('fade-in-up');
        }, index * 100);
    });

    // Show message if no products found
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No products found</h4>
                <p class="text-muted">Try adjusting your search or filter criteria</p>
            </div>
        `;
    }
}

// Create product card HTML
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'col-lg-4 col-md-6 mb-4';
    
    const stars = generateStars(product.rating);
    const badgeHTML = product.isNew ? '<span class="badge-new">New</span>' : '';
    const saleBadgeHTML = product.onSale ? '<span class="badge-sale">Sale</span>' : '';
    const originalPriceHTML = product.originalPrice ? `<span class="text-decoration-line-through text-muted me-2">$${product.originalPrice}</span>` : '';

    productCard.innerHTML = `
        <div class="card product-card hover-lift">
            <div class="product-image">
                ${badgeHTML}
                ${saleBadgeHTML}
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class="product-overlay">
                    <button class="btn btn-primary btn-sm" onclick="showProductModal(${product.id})">
                        <i class="fas fa-eye me-1"></i> View Details
                    </button>
                </div>
            </div>
            <div class="card-body product-info">
                <h5 class="product-title">${product.name}</h5>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <small class="text-muted">(${product.reviews} reviews)</small>
                </div>
                <div class="product-price">
                    ${originalPriceHTML}
                    <span class="fw-bold">$${product.price}</span>
                </div>
                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    return productCard;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartUI();
    saveCartToStorage();
    showToast('Product added to cart!', 'success');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
    showToast('Product removed from cart', 'info');
}

// Update product quantity in cart
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Calculate totals
        const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
        total.textContent = `$${subtotalAmount.toFixed(2)}`;
        cartTotal.style.display = 'block';
    }
}

// Show product modal
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = product.category.toUpperCase();
    document.getElementById('modalProductPrice').textContent = `$${product.price}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    // Set up modal add to cart button
    const modalAddToCartBtn = document.getElementById('modalAddToCart');
    modalAddToCartBtn.onclick = function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(productId, quantity);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    // Show modal
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Load filtered products
            const filter = this.getAttribute('data-filter');
            loadProducts(filter, searchInput.value);
        });
    });

    // Search input
    searchInput.addEventListener('input', function() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        loadProducts(activeFilter, this.value);
    });

    // Clear cart button
    document.getElementById('clearCart').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            updateCartUI();
            saveCartToStorage();
            showToast('Cart cleared', 'info');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shopease_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
        <div class="toast toast-${type}" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
            <div class="toast-body d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    // Show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();

    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        this.remove();
    });
}

// Add loading animation to buttons
function addLoadingToButton(button, duration = 2000) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading-spinner me-2"></span>Loading...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, duration);
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add to cart with animation
function addToCartWithAnimation(productId, quantity = 1) {
    const button = event.target;
    addLoadingToButton(button, 1000);
    
    setTimeout(() => {
        addToCart(productId, quantity);
    }, 500);
}

// Wishlist functionality (placeholder)
let wishlist = [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist', 'success');
    }
    localStorage.setItem('shopease_wishlist', JSON.stringify(wishlist));
}

// Newsletter subscription (placeholder)
function subscribeNewsletter(email) {
    if (email && email.includes('@')) {
        showToast('Thank you for subscribing!', 'success');
        return true;
    } else {
        showToast('Please enter a valid email address', 'error');
        return false;
    }
}

// Price filter functionality (placeholder for future enhancement)
function filterByPriceRange(min, max) {
    const filteredProducts = products.filter(product => 
        product.price >= min && product.price <= max
    );
    // Update products grid with filtered products
    console.log('Filtered products by price:', filteredProducts);
}

// Sort products functionality
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default sorting by id
            break;
    }
    
    // Update the global products array temporarily for display
    const originalProducts = [...products];
    products.length = 0;
    products.push(...sortedProducts);
    
    // Reload products grid
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    loadProducts(activeFilter, searchInput.value);
    
    // Restore original products array
    setTimeout(() => {
        products.length = 0;
        products.push(...originalProducts);
    }, 100);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to hero section
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('slide-in-left');
        document.querySelector('.hero-image').classList.add('slide-in-right');
    }, 500);
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Export functions for global access (if needed)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.showProductModal = showProductModal;
window.toggleWishlist = toggleWishlist;
window.sortProducts = sortProducts;