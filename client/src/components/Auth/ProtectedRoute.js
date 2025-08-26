import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../../styles/GlobalStyles';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner large />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;