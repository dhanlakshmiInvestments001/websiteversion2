import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";
import PasswordPage from "./blogCMS/PasswordPage";
import WriteBlog from "./blogCMS/WriteBlog";
import WriteTestimonial from "./pages/WriteTestimonials";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import BlogPost from "./pages/BlogPost";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content" style={{ paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/write-blog" element={<PasswordPage />} />
          <Route path="/cms/write" element={<WriteBlog />} />
          <Route path="/write-testimonial" element={<WriteTestimonial />} />
        </Routes>
      </div>
      <Footer />
      <ChatButton />
    </Router>
  );
}

export default App;
