# ModernBlog - Full-Stack Blog Website

A modern, full-featured blog website built with React, Node.js, Express, and MongoDB. This project includes user authentication, blog post management, commenting system, admin panel, and responsive design.

![ModernBlog Screenshot](./screenshot.png)

## 🚀 Features

### Core Features
- **User Authentication** - Register, login, logout with JWT tokens
- **Blog Post Management** - Create, read, update, delete posts
- **Rich Text Editor** - Markdown support with live preview
- **Comment System** - Nested comments with likes
- **User Profiles** - Customizable user profiles with avatars
- **Search & Filter** - Search posts by title, content, category, tags
- **Categories & Tags** - Organize posts with categories and tags
- **Responsive Design** - Mobile-first, works on all devices

### Advanced Features
- **Admin Panel** - User and content management
- **Dark/Light Mode** - Theme switching with system preference detection
- **SEO Optimization** - Meta tags, structured data, sitemap
- **Social Sharing** - Share posts on social media
- **Analytics** - Post views, likes, engagement metrics
- **Email Notifications** - Comment notifications, newsletters
- **Image Uploads** - Featured images and inline images
- **Pagination** - Efficient content loading
- **Rate Limiting** - API protection and security

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and context
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations and transitions
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **React Markdown** - Markdown rendering
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

## 📁 Project Structure

```
modern-blog-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Auth/       # Authentication components
│   │   │   ├── Layout/     # Layout components
│   │   │   ├── Post/       # Post-related components
│   │   │   └── UI/         # UI components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # Styled components
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── uploads/           # File uploads
│   ├── .env               # Environment variables
│   └── package.json
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modern-blog-website.git
   cd modern-blog-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:3000
   
   # Optional: Email configuration
   EMAIL_FROM=noreply@yourblog.com
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

4. **Start the application**
   ```bash
   # From root directory - starts both server and client
   npm run dev
   
   # Or start individually:
   # Server (from server directory)
   npm run dev
   
   # Client (from client directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/password` - Change password

### Posts Endpoints
- `GET /api/posts` - Get all published posts (with pagination)
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `POST /api/posts/:id/like` - Toggle like on post (auth required)

### Comments Endpoints
- `GET /api/comments/post/:postId` - Get comments for post
- `POST /api/comments` - Create comment (auth required)
- `PUT /api/comments/:id` - Update comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)
- `POST /api/comments/:id/like` - Toggle like on comment (auth required)

### Users Endpoints
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:identifier` - Get user by ID or username
- `PUT /api/users/:userId` - Update user (admin or owner)
- `DELETE /api/users/:userId` - Delete user (admin only)

## 🎨 Customization

### Themes
The application supports light and dark themes. You can customize colors in `/client/src/styles/GlobalStyles.js`:

```javascript
:root {
  --primary-color: #3182ce;
  --primary-dark: #2c5aa0;
  // ... other CSS variables
}
```

### Adding New Features
1. **Backend**: Add new models, routes, and controllers in respective directories
2. **Frontend**: Create components in `/client/src/components/` and pages in `/client/src/pages/`
3. **API Integration**: Add service functions in `/client/src/services/`

## 🔧 Configuration

### Database Configuration
Update MongoDB connection in `/server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/blog
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog
```

### Email Configuration (Optional)
For email notifications, configure SMTP settings in `/server/.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables for API URL

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Update CORS settings for production domain
3. Deploy server code
4. Ensure MongoDB connection is configured

### Full-Stack (Docker)
Create `docker-compose.yml` for containerized deployment:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_DATABASE: blog
    ports:
      - "27017:27017"
  
  backend:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://mongodb:27017/blog
  
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 📊 Performance Optimization

### Backend
- Database indexing for frequently queried fields
- Image optimization and compression
- Caching with Redis (optional)
- API rate limiting
- Compression middleware

### Frontend
- Code splitting with React.lazy()
- Image lazy loading
- Bundle optimization
- Service worker for caching

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- Rate limiting
- File upload restrictions
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB team for the database
- All open-source contributors

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@modernblog.com
- Documentation: [Wiki](https://github.com/yourusername/modern-blog-website/wiki)

---

**Happy Blogging! 🎉**