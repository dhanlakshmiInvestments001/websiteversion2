import React, { useState, useRef } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import "./ContactUs.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const hiddenFormRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send to Firebase
    await addDoc(collection(db, "contacts"), form);
    setSubmitted(true);

    // Submit to FormSubmit (email service)
    hiddenFormRef.current.submit();
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      {/* Static Description */}
      <div className="contact-description">
        <p>
          We are committed to delivering high-quality service that you can rely on.
          Reach out to us anytime for queries, collaborations, or just a friendly chat.
          Our team is available around the clock to support your needs.
          From the smallest doubt to the biggest project, we are here to help.
          You can trust us for transparency, quality, and dedication.
          We're passionate about your satisfaction.
          Whether you’re a customer, partner, or just curious — we welcome you.
          Fill the form below or reach us through our social media channels.
          We believe in strong connections and meaningful conversations.
          Let’s build something great together.
        </p>
      </div>

      {/* Form + Contact Info */}
      <div className="form-contact-row">
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" rows={4} onChange={handleChange} required />
          <button type="submit">Submit</button>
          {submitted && <p className="success-msg">Message submitted successfully!</p>}
        </form>

        {/* Hidden FormSubmit email form */}
        <form
          ref={hiddenFormRef}
          action="https://formsubmit.co/dhanalakshmiinvestments001@gmail.com"
          method="POST"
          style={{ display: "none" }}
        >
          <input type="hidden" name="name" value={form.name} />
          <input type="hidden" name="email" value={form.email} />
          <input type="hidden" name="message" value={form.message} />
          <input type="hidden" name="_captcha" value="false" />
        </form>

        <div className="contact-info">
          <h3>Reach Us</h3>
          <p>📍 72/2 Liddle Road, George Town, Prayagraj, Uttar Pradesh, India-211002</p>
          <p>📞 +91-7905068217
          📞 +91-7317273917
          </p>
          <p>📧 dhanalakshmiinvestments001@gmail.com</p>
        </div>
      </div>

      {/* Join Us On Section */}
      <h2>Join Us On</h2>
      <div className="social-cards">
        <a href="https://facebook.com/HUTNoni" target="_blank" rel="noreferrer" className="social-card">
          <FaFacebook size={32} />
          <span>Facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-card">
          <FaInstagram size={32} />
          <span>Instagram</span>
        </a>
        <a href="https://linkedin.com/in/anubhavsharma9/" target="_blank" rel="noreferrer" className="social-card">
          <FaLinkedin size={32} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
