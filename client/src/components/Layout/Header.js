import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiEdit, 
  FiUser, 
  FiLogOut, 
  FiSun, 
  FiMoon,
  FiSearch,
  FiPlusCircle
} from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Container, Button } from '../../styles/GlobalStyles';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: var(--transition);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: none;
    color: var(--primary-dark);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  transition: var(--transition);
  position: relative;

  &:hover {
    color: var(--primary-color);
    background-color: var(--bg-accent);
    text-decoration: none;
  }

  &.active {
    color: var(--primary-color);
    background-color: var(--bg-accent);
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: transparent;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    background-color: var(--bg-accent);
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  overflow: hidden;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    background-color: var(--bg-accent);
    color: var(--primary-color);
    text-decoration: none;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--bg-accent);
    color: var(--primary-color);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    background-color: var(--bg-accent);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    background-color: var(--bg-accent);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  transition: var(--transition);

  &:hover {
    background-color: var(--bg-accent);
    color: var(--primary-color);
    text-decoration: none;
  }

  &.active {
    background-color: var(--bg-accent);
    color: var(--primary-color);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo to="/">
            <FiEdit />
            ModernBlog
          </Logo>

          <Nav>
            <NavLink to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/posts" className={isActive('/posts') ? 'active' : ''}>
              Posts
            </NavLink>
            <NavLink to="/about" className={isActive('/about') ? 'active' : ''}>
              About
            </NavLink>
            <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </NavLink>
          </Nav>

          <UserMenu>
            <ThemeToggle onClick={toggleTheme}>
              {isDark ? <FiSun /> : <FiMoon />}
            </ThemeToggle>

            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <UserButton onClick={() => setShowUserMenu(!showUserMenu)}>
                  <Avatar>{getUserInitials()}</Avatar>
                  <span>{user?.firstName}</span>
                </UserButton>

                {showUserMenu && (
                  <Dropdown
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownItem to="/dashboard">
                      <FiHome />
                      Dashboard
                    </DropdownItem>
                    <DropdownItem to="/dashboard/posts/new">
                      <FiPlusCircle />
                      New Post
                    </DropdownItem>
                    <DropdownItem to="/profile">
                      <FiUser />
                      Profile
                    </DropdownItem>
                    <DropdownButton onClick={handleLogout}>
                      <FiLogOut />
                      Logout
                    </DropdownButton>
                  </Dropdown>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button as={Link} to="/login" outline small>
                  Login
                </Button>
                <Button as={Link} to="/register" primary small>
                  Sign Up
                </Button>
              </div>
            )}
          </UserMenu>

          <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </HeaderContent>
      </Container>

      {showMobileMenu && (
        <MobileMenu
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MobileNavLink to="/" className={isActive('/') ? 'active' : ''}>
            <FiHome />
            Home
          </MobileNavLink>
          <MobileNavLink to="/posts" className={isActive('/posts') ? 'active' : ''}>
            <FiEdit />
            Posts
          </MobileNavLink>
          <MobileNavLink to="/about" className={isActive('/about') ? 'active' : ''}>
            <FiUser />
            About
          </MobileNavLink>
          <MobileNavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
            <FiSearch />
            Contact
          </MobileNavLink>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '1rem 0', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Theme</span>
              <ThemeToggle onClick={toggleTheme}>
                {isDark ? <FiSun /> : <FiMoon />}
              </ThemeToggle>
            </div>

            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard">
                  <FiHome />
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/profile">
                  <FiUser />
                  Profile
                </MobileNavLink>
                <MobileNavLink to="/dashboard/posts/new">
                  <FiPlusCircle />
                  New Post
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button as={Link} to="/login" outline>
                  Login
                </Button>
                <Button as={Link} to="/register" primary>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;