import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

import { Container } from '../../styles/GlobalStyles';

const FooterContainer = styled.footer`
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: var(--text-primary);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--primary-color);
      text-decoration: none;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-color);
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    color: var(--danger-color);
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: var(--transition);

    &:hover {
      color: var(--primary-color);
      text-decoration: none;
    }
  }
`;

const Newsletter = styled.div`
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const NewsletterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription');
  };

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>ModernBlog</h3>
            <p>
              A modern, full-featured blog platform built with React and Node.js. 
              Share your thoughts, connect with readers, and build your online presence.
            </p>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </SocialLink>
              <SocialLink href="mailto:hello@modernblog.com">
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts">All Posts</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Categories</h3>
            <FooterLinks>
              <li><Link to="/posts?category=Technology">Technology</Link></li>
              <li><Link to="/posts?category=Lifestyle">Lifestyle</Link></li>
              <li><Link to="/posts?category=Travel">Travel</Link></li>
              <li><Link to="/posts?category=Food">Food</Link></li>
              <li><Link to="/posts?category=Health">Health</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <Newsletter>
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for the latest posts and updates.</p>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <NewsletterButton type="submit">
                  Subscribe
                </NewsletterButton>
              </NewsletterForm>
            </Newsletter>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 ModernBlog. Made with <FiHeart /> for bloggers everywhere.
          </Copyright>
          <FooterNav>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/rss">RSS Feed</Link>
          </FooterNav>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;