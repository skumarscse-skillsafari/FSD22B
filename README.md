# ShopZone E-commerce Website

A modern, responsive e-commerce website built with HTML, CSS, JavaScript, and Bootstrap 5.

## Features

### 🛍️ Core E-commerce Functionality
- **Product Catalog**: Browse through a variety of products across multiple categories
- **Search & Filter**: Find products by name, description, or category
- **Sorting**: Sort products by price (low to high, high to low) or name
- **Shopping Cart**: Add/remove items, update quantities, view total
- **Product Details**: Quick view modal with detailed product information
- **Checkout Process**: Simulated checkout flow

### 🎨 User Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Bootstrap 5 UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and transitions
- **Toast Notifications**: User feedback for actions like adding items to cart

### 📱 User Experience
- **Intuitive Navigation**: Easy-to-use navigation with dropdown categories
- **Search Functionality**: Real-time search with highlighting
- **Cart Management**: Persistent cart using localStorage
- **Loading States**: Smooth loading animations and states
- **Accessibility**: Proper ARIA labels and keyboard navigation

## File Structure

```
/workspace/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with animations and responsive design
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Bootstrap 5.3.2**: Responsive grid system and components
- **Font Awesome 6.4.0**: Icons and visual elements

## Product Categories

The website includes products in the following categories:
- **Electronics**: Smartphones, laptops, headphones, smartwatches
- **Clothing**: T-shirts, jeans, jackets
- **Books**: Programming guides, cooking books, photography guides
- **Home & Garden**: Plants, yoga mats, home accessories

## Key JavaScript Features

### Shopping Cart Management
- Add/remove products
- Update quantities
- Calculate totals
- Persistent storage using localStorage
- Real-time UI updates

### Product Filtering & Search
- Category-based filtering
- Real-time text search
- Product sorting options
- Pagination with "Load More" functionality

### Interactive UI Components
- Product detail modals
- Shopping cart modal
- Toast notifications
- Smooth scrolling navigation
- Responsive navigation menu

## Getting Started

1. **Open the Website**: Simply open `index.html` in your web browser
2. **Browse Products**: Scroll down to view the product catalog
3. **Filter & Search**: Use the category filters and search bar to find specific products
4. **Add to Cart**: Click "Add to Cart" on any product
5. **View Cart**: Click the cart icon in the navigation to view your items
6. **Checkout**: Proceed to checkout (demo functionality)

## Browser Compatibility

This website is compatible with all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: 768px - 992px
- **Large Desktop**: > 992px

## Customization

### Adding New Products
Edit the `sampleProducts` array in `script.js` to add new products:

```javascript
{
    id: 13,
    name: "Product Name",
    price: 99.99,
    category: "electronics",
    image: "image-url.jpg",
    description: "Product description",
    rating: 4.5,
    reviews: 100,
    inStock: true
}
```

### Styling Customization
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    /* Add your custom colors */
}
```

## Performance Optimizations

- **Lazy Loading**: Images load as needed
- **Efficient DOM Manipulation**: Minimal reflows and repaints
- **Local Storage**: Cart persistence without server calls
- **Debounced Search**: Optimized search performance
- **CSS Animations**: Hardware-accelerated transitions

## Future Enhancements

Potential features to add:
- User authentication and profiles
- Product reviews and ratings system
- Wishlist functionality
- Advanced filtering (price range, ratings)
- Payment gateway integration
- Order history and tracking
- Product recommendations
- Multi-language support

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please contact: info@shopzone.com

---

**ShopZone** - Your Premier E-commerce Destination 🛍️