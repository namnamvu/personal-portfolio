import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/contact', {
        name: formData.name,
        subject: 'Contact Form Submission',
        email: 'anonymous@email.com', // replace with real input later
        message: `Phone: ${formData.phone}\n\n${formData.message}`
      });
      alert('Message sent!');
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err); // Add this for debugging
      alert('Failed to send message.');
    }
  };

  return (
        <div className="form-card">
          <div className="contact-heading">
            <h3>By Form</h3>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" className="contact-input" placeholder="Name" value={formData.name} onChange={handleChange} />
              <input type="text" name="phone" className="contact-input" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
              <textarea name="message" className="contact-input message-input" placeholder="Your message" value={formData.message} onChange={handleChange}></textarea>
              <div id="send">
                <input type="submit" value="SEND" />
              </div>
            </form>
          </div>
        </div>
  );
};

export default ContactForm;
