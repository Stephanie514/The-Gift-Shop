import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/Contact';
import '../styles.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Header />
      <h1>Contact Us</h1>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactPage;