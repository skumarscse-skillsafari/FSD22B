import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #3182ce;
    --primary-dark: #2c5aa0;
    --secondary-color: #e2e8f0;
    --accent-color: #38a169;
    --danger-color: #e53e3e;
    --warning-color: #d69e2e;
    
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f7fafc;
    --bg-accent: #edf2f7;
    
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    
    --transition: all 0.2s ease;
  }

  .dark {
    --text-primary: #f7fafc;
    --text-secondary: #e2e8f0;
    --text-muted: #a0aec0;
    
    --bg-primary: #1a202c;
    --bg-secondary: #2d3748;
    --bg-accent: #4a5568;
    
    --border-color: #4a5568;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    transition: var(--transition);
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; /* Account for fixed header */
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

export const Card = styled.div`
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
  transition: var(--transition);
  border: 1px solid var(--border-color);

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Button = styled.button`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Primary Button */
  ${props => props.primary && `
    background-color: var(--primary-color);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--primary-dark);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
    }
  `}

  /* Secondary Button */
  ${props => props.secondary && `
    background-color: var(--secondary-color);
    color: var(--text-secondary);

    &:hover:not(:disabled) {
      background-color: var(--bg-accent);
    }
  `}

  /* Outline Button */
  ${props => props.outline && `
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);

    &:hover:not(:disabled) {
      background-color: var(--primary-color);
      color: white;
    }
  `}

  /* Danger Button */
  ${props => props.danger && `
    background-color: var(--danger-color);
    color: white;

    &:hover:not(:disabled) {
      background-color: #c53030;
    }
  `}

  /* Size variants */
  ${props => props.small && `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}

  ${props => props.large && `
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `}
`;

export const Input = styled.input`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const TextArea = styled.textarea`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
  width: 100%;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const Select = styled.select`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: var(--transition);
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  ${props => props.small && `
    width: 1rem;
    height: 1rem;
    border-width: 1px;
  `}

  ${props => props.large && `
    width: 2rem;
    height: 2rem;
    border-width: 3px;
  `}
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;

  ${props => props.cols && `
    grid-template-columns: repeat(${props.cols}, 1fr);
  `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 1rem;

  ${props => props.column && `
    flex-direction: column;
  `}

  ${props => props.center && `
    align-items: center;
    justify-content: center;
  `}

  ${props => props.between && `
    justify-content: space-between;
    align-items: center;
  `}

  ${props => props.wrap && `
    flex-wrap: wrap;
  `}
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-lg);
  background-color: var(--bg-accent);
  color: var(--text-secondary);

  ${props => props.primary && `
    background-color: var(--primary-color);
    color: white;
  `}

  ${props => props.success && `
    background-color: var(--accent-color);
    color: white;
  `}

  ${props => props.danger && `
    background-color: var(--danger-color);
    color: white;
  `}
`;