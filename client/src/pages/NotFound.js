import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

import { Container, Section, Button, Flex } from '../styles/GlobalStyles';

const NotFoundContainer = styled(Section)`
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundContent = styled.div`
  max-width: 500px;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NotFoundContainer>
        <Container>
          <NotFoundContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ErrorCode>404</ErrorCode>
              <ErrorTitle>Page Not Found</ErrorTitle>
              <ErrorMessage>
                Oops! The page you're looking for doesn't exist. It might have been moved, 
                deleted, or you entered the wrong URL.
              </ErrorMessage>
              <Flex center style={{ gap: '1rem', flexWrap: 'wrap' }}>
                <Button as={Link} to="/" primary>
                  <FiHome />
                  Go Home
                </Button>
                <Button onClick={() => window.history.back()} outline>
                  <FiArrowLeft />
                  Go Back
                </Button>
              </Flex>
            </motion.div>
          </NotFoundContent>
        </Container>
      </NotFoundContainer>
    </motion.div>
  );
};

export default NotFound;