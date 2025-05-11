import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import "./WriteTestimonials.css";

function WriteTestimonial() {
  const [form, setForm] = useState({ name: "", imageURL: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addDoc(collection(db, "testimonials"), form);
    setSubmitted(true);
    setForm({ name: "", imageURL: "", text: "" });
  };

  return (
    <div className="testimonial-form-container">
      <h2>Write a Testimonial</h2>
      <form onSubmit={handleSubmit} className="testimonial-form">
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} required />
        <textarea name="text" placeholder="Your Testimonial" rows="4" value={form.text} onChange={handleChange} required />
        <button type="submit">Submit</button>
        {submitted && <p className="success-msg">Thank you for your feedback!</p>}
      </form>
    </div>
  );
}

export default WriteTestimonial;
