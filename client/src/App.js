import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/Dashboard/CreatePost';
import EditPost from './pages/Dashboard/EditPost';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Protected Route Component
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Global Styles
import { GlobalStyle, AppContainer, MainContent } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/:slug" element={<PostDetail />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/posts/new"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/posts/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;