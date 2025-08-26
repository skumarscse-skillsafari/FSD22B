import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiEdit3, FiUsers, FiTrendingUp, FiStar } from 'react-icons/fi';

import { Container, Section, Button, Card, Grid, Flex } from '../styles/GlobalStyles';

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  text-align: center;
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FeatureCard = styled(Card)`
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
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const StatsSection = styled(Section)`
  background: var(--bg-secondary);
`;

const StatCard = styled.div`
  text-align: center;

  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const CTASection = styled(Section)`
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  text-align: center;
  border-radius: var(--radius-xl);
  margin: 0 1rem;

  h2, p {
    color: white;
  }

  p {
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              Share Your Story with the World
            </HeroTitle>
            <HeroSubtitle>
              Join thousands of writers on ModernBlog - the platform where ideas come to life. 
              Create, publish, and connect with readers who share your passion.
            </HeroSubtitle>
            <HeroButtons>
              <Button as={Link} to="/register" primary large>
                Get Started Free
                <FiArrowRight />
              </Button>
              <Button as={Link} to="/posts" outline large>
                Explore Posts
              </Button>
            </HeroButtons>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Section>
        <Container>
          <SectionTitle>Why Choose ModernBlog?</SectionTitle>
          <Grid cols={3}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FiEdit3 />
                <h3>Rich Editor</h3>
                <p>
                  Write with our powerful markdown editor. Format text, add images, 
                  and create beautiful posts with ease.
                </p>
              </FeatureCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FiUsers />
                <h3>Community</h3>
                <p>
                  Connect with like-minded writers and readers. Comment, like, 
                  and engage with content that inspires you.
                </p>
              </FeatureCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FeatureCard>
                <FiTrendingUp />
                <h3>Analytics</h3>
                <p>
                  Track your post performance with detailed analytics. 
                  See views, likes, and engagement metrics.
                </p>
              </FeatureCard>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <Grid cols={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <h3>10K+</h3>
                <p>Active Writers</p>
              </StatCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <h3>50K+</h3>
                <p>Published Posts</p>
              </StatCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <h3>1M+</h3>
                <p>Monthly Readers</p>
              </StatCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StatCard>
                <h3>4.9</h3>
                <p>User Rating</p>
              </StatCard>
            </motion.div>
          </Grid>
        </Container>
      </StatsSection>

      {/* Features Grid */}
      <Section>
        <Container>
          <SectionTitle>Everything You Need to Blog</SectionTitle>
          <Grid cols={2}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <Flex>
                  <FiStar style={{ color: 'var(--primary-color)', fontSize: '2rem', marginRight: '1rem' }} />
                  <div>
                    <h3>SEO Optimized</h3>
                    <p>
                      Built-in SEO features help your content rank higher in search results. 
                      Custom meta tags, structured data, and more.
                    </p>
                  </div>
                </Flex>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <Flex>
                  <FiUsers style={{ color: 'var(--primary-color)', fontSize: '2rem', marginRight: '1rem' }} />
                  <div>
                    <h3>Social Sharing</h3>
                    <p>
                      Share your posts across all major social platforms with one click. 
                      Built-in social media integration.
                    </p>
                  </div>
                </Flex>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <Flex>
                  <FiTrendingUp style={{ color: 'var(--primary-color)', fontSize: '2rem', marginRight: '1rem' }} />
                  <div>
                    <h3>Mobile Responsive</h3>
                    <p>
                      Your blog looks perfect on all devices. Responsive design ensures 
                      great reading experience everywhere.
                    </p>
                  </div>
                </Flex>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <Flex>
                  <FiEdit3 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginRight: '1rem' }} />
                  <div>
                    <h3>Custom Themes</h3>
                    <p>
                      Choose from beautiful themes or customize your own. 
                      Dark mode, light mode, and everything in between.
                    </p>
                  </div>
                </Flex>
              </Card>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CTASection>
            <h2>Ready to Start Your Blogging Journey?</h2>
            <p>
              Join thousands of writers who have already discovered the joy of blogging with ModernBlog. 
              It's free to get started, and you can upgrade anytime.
            </p>
            <Flex center style={{ marginTop: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
              <Button as={Link} to="/register" style={{ backgroundColor: 'white', color: 'var(--primary-color)' }} large>
                Create Your Account
                <FiArrowRight />
              </Button>
              <Button as={Link} to="/about" outline style={{ borderColor: 'white', color: 'white' }}>
                Learn More
              </Button>
            </Flex>
          </CTASection>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Home;