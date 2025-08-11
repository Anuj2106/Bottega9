'use client';
import { useState } from 'react';
import Hero from '../Components/Hero';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import '../Css/contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Example API POST request - change URL to your backend handler
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('Something went wrong, please try again.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="contact-page">

      {/* Hero banner with backend banner for Contact Page */}
      <Hero Page="contact" />

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5">Get in Touch</h2>
        <div className="row g-5">
          
          {/* Left side - Contact Info */}
          <div className="col-lg-4">
            <div className="contact-info-card">
              <MapPin className="icon-gold" />
              <h5 className="fw-semibold">Address</h5>
              <p>SCO 5 (First Floor), Sector 7C, Madhya Marg, Chandigarh, India 160019</p>
            </div>
            <div className="contact-info-card">
              <Phone className="icon-gold" />
              <h5 className="fw-semibold">Phone</h5>
              <p>+91  8194‑8194‑65</p>
            </div>
            <div className="contact-info-card">
              <Mail className="icon-gold" />
              <h5 className="fw-semibold">Email</h5>
              <p> sales@bottega9.in</p>
            </div>
            <div className="contact-info-card">
              <Clock className="icon-gold" />
              <h5 className="fw-semibold">Working Hours</h5>
              <p>Mon–Sat: 10am – 7pm</p>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="col-lg-8">
            <form className="contact-form p-4 shadow-sm rounded bg-white" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" name="name" value={formData.name}
                  onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input type="email" name="email" value={formData.email}
                  onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea name="message" value={formData.message}
                  onChange={handleChange} className="form-control" rows="5" required />
              </div>
              <button type="submit" className="btn btn-gold px-4 py-2 fw-semibold">Send Message</button>
              {status && <p className="mt-3">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      {/* Google Map */}
<section className="map-section">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.4504589997277!2d76.79474547544099!3d30.733845974583666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb92fab5fa31%3A0x64e2d5e15c3a2534!2sBottega9!5e0!3m2!1sen!2sin!4v1754848275752!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>

    </div>
  );
};

export default ContactPage;
