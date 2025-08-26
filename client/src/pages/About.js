import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiTarget, FiAward } from 'react-icons/fi';

import { Container, Section, Card, Grid } from '../styles/GlobalStyles';

const AboutHero = styled(Section)`
  text-align: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const ValueCard = styled(Card)`
  text-align: center;
  padding: 2rem;

  svg {
    width: 3rem;
    height: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const StorySection = styled(Section)`
  background: var(--bg-secondary);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }
`;

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <AboutHero>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AboutTitle>About ModernBlog</AboutTitle>
            <AboutSubtitle>
              We're building the future of blogging - a platform where writers can share their 
              stories, connect with readers, and build meaningful communities around their ideas.
            </AboutSubtitle>
          </motion.div>
        </Container>
      </AboutHero>

      {/* Our Values */}
      <Section>
        <Container>
          <SectionTitle>Our Values</SectionTitle>
          <Grid cols={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ValueCard>
                <FiHeart />
                <h3>Passion</h3>
                <p>
                  We believe in the power of passionate writing to change minds and inspire action.
                </p>
              </ValueCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ValueCard>
                <FiUsers />
                <h3>Community</h3>
                <p>
                  Building connections between writers and readers is at the heart of what we do.
                </p>
              </ValueCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ValueCard>
                <FiTarget />
                <h3>Purpose</h3>
                <p>
                  Every feature we build serves a purpose: to make blogging more accessible and enjoyable.
                </p>
              </ValueCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ValueCard>
                <FiAward />
                <h3>Excellence</h3>
                <p>
                  We strive for excellence in everything we do, from code quality to user experience.
                </p>
              </ValueCard>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Our Story */}
      <StorySection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Our Story</SectionTitle>
            <StoryContent>
              <p>
                ModernBlog was born from a simple idea: blogging should be beautiful, intuitive, and accessible to everyone. 
                We noticed that many blogging platforms were either too complex for beginners or too limiting for experienced writers.
              </p>
              <p>
                Our team of developers, designers, and writers came together to create something different. We wanted to build 
                a platform that combines the simplicity of modern design with the power of advanced features, all while 
                maintaining a focus on the writing experience.
              </p>
              <p>
                Today, ModernBlog serves thousands of writers worldwide, from personal bloggers sharing their daily experiences 
                to professional writers building their careers. We're proud to be part of their journey and committed to 
                continuously improving our platform.
              </p>
              <p>
                Whether you're just starting your blogging journey or you're a seasoned writer looking for a better platform, 
                we're here to support you every step of the way. Welcome to the ModernBlog community!
              </p>
            </StoryContent>
          </motion.div>
        </Container>
      </StorySection>
    </motion.div>
  );
};

export default About;