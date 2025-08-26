import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Section, Card, Grid, Input, TextArea, Button, Flex } from '../styles/GlobalStyles';

const ContactHero = styled(Section)`
  text-align: center;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
`;

const ContactTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactCard = styled(Card)`
  text-align: center;
  padding: 2rem;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FormCard = styled(Card)`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <ContactHero>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ContactTitle>Get in Touch</ContactTitle>
            <ContactSubtitle>
              Have questions, feedback, or just want to say hello? We'd love to hear from you. 
              Reach out to us using any of the methods below.
            </ContactSubtitle>
          </motion.div>
        </Container>
      </ContactHero>

      {/* Contact Info */}
      <Section>
        <Container>
          <Grid cols={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ContactCard>
                <FiMail />
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@modernblog.com">hello@modernblog.com</a>
                </p>
              </ContactCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactCard>
                <FiPhone />
                <h3>Phone</h3>
                <p>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </p>
              </ContactCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ContactCard>
                <FiMapPin />
                <h3>Address</h3>
                <p>
                  123 Blog Street<br />
                  Tech City, TC 12345
                </p>
              </ContactCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactCard>
                <FiMessageCircle />
                <h3>Support</h3>
                <p>
                  <a href="mailto:support@modernblog.com">support@modernblog.com</a>
                </p>
              </ContactCard>
            </motion.div>
          </Grid>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                  Send us a Message
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <FormCard>
                <form onSubmit={handleSubmit}>
                  <Grid cols={2}>
                    <FormGroup>
                      <label htmlFor="name">Name *</label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="email">Email *</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </FormGroup>
                  </Grid>

                  <FormGroup>
                    <label htmlFor="subject">Subject *</label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="message">Message *</label>
                    <TextArea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your message..."
                      rows="6"
                      required
                    />
                  </FormGroup>

                  <Flex style={{ justifyContent: 'flex-end' }}>
                    <Button type="submit" primary disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Flex>
                </form>
              </FormCard>
            </div>
          </motion.div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Contact;