import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const carouselRef = useRef(null); // added for animating the carousel
  const [isHovered, setIsHovered] = useState(false); // added for animating the carousel

  useEffect(() => {
    const fetchData = async () => {
      const blogSnap = await getDocs(collection(db, "homeBlogs"));
      const testimonialSnap = await getDocs(collection(db, "testimonials"));
      setBlogs(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTestimonials(testimonialSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);
  // Auto-scroll effect
  useEffect(() => {
    const carousel = carouselRef.current;
    let animationFrameId;

    const scroll = () => {
      if (carousel && !isHovered) {
        carousel.scrollLeft += 0.5; // speed of scrolling
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0; // loop back
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);


  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/assets/hero.jpg" alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1>Welcome to DhanaLakshmi Investments</h1>
          <p>Your trusted service partner</p>
          <a
            href="https://wa.me/7905068217?text=Hi%20there!%20I%20saw%20your%20website%20kindly%20contact%20me."
            className="hero-whatsapp-btn"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Blog Cards */}
      {/* <div className="cards-section">
        {blogs.map(blog => (
          <motion.div className="card" key={blog.id} whileHover={{ scale: 1.05 }}>
            <Link to={`/blog/${blog.id}`}>
              <img src={blog.imageURL} alt={blog.title} />
              <h3>{blog.title}</h3>
            </Link>
          </motion.div>
        ))} */}
        <div className="blog-carousel-section">
  <h2 className="carousel-title">Latest Blogs</h2>
  <div className="blog-carousel"
  ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
    {blogs.map(blog => (
      <motion.div
        className="carousel-card"
        key={blog.id}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link to={`/blog/${blog.id}`}>
          <img src={blog.imageURL} alt={blog.title} />
          <h3>{blog.title}</h3>
        </Link>
      </motion.div>
    ))}

        {/* EMI Calculator Card */}
        {/* <motion.div className="card" whileHover={{ scale: 1.05 }}>
          <Link to="/emi-calculator">
            <img src="/assets/emi.jpg" alt="EMI Calculator" />
            <h3>Use EMI Calculator</h3>
          </Link>
        </motion.div>
      </div> */}
      <motion.div className="carousel-card" whileHover={{ scale: 1.05 }}>
      <Link to="/emi-calculator">
        <img src="/assets/emi.jpg" alt="EMI Calculator" />
        <h3>Use EMI Calculator</h3>
      </Link>
    </motion.div>
  </div>
</div>

      {/* Testimonials */}
<div className="testimonials-section">
  <h2 className="testimonials-title">What Our Clients Say</h2>
  <div className="testimonial-carousel">
    {testimonials.map(t => (
      <motion.div
        className="testimonial-card"
        key={t.id}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="quote-mark">“</div>
        <p className="testimonial-text">{t.text}</p>
        <h4 className="testimonial-name">– {t.name}</h4>
      </motion.div>
    ))}
  </div>
</div>


    </div>
  );
}

export default Home;

//////////VERSION1===========
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { db } from "../firebase/config";
// import { collection, getDocs } from "firebase/firestore";
// import "./Home.css";

// function Home() {
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       const querySnapshot = await getDocs(collection(db, "testimonials"));
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setTestimonials(data);
//     };
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <motion.div className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//         <img src="/assets/hero.jpg" alt="Hero" className="hero-image" />
//         <div className="hero-overlay">
//           <h1>Welcome to Our Site</h1>
//           <p>Your trusted service partner</p>
//           <a
//             href="https://wa.me/1234567890?text=Hi%20there!%20I%20saw%20your%20website."
//             className="hero-whatsapp-btn"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Chat on WhatsApp
//           </a>
//         </div>
//       </motion.div>

//       {/* Cards Section */}
//       <div className="cards-section">
//         <motion.div className="card" whileHover={{ scale: 1.05 }}>
//           <Link to="/blog/1">
//             <img src="/assets/blog1.jpg" alt="Blog 1" />
//             <h3>How We Helped a Client</h3>
//           </Link>
//         </motion.div>
//         <motion.div className="card" whileHover={{ scale: 1.05 }}>
//           <Link to="/blog/2">
//             <img src="/assets/blog2.jpg" alt="Blog 2" />
//             <h3>Success Story from Our Team</h3>
//           </Link>
//         </motion.div>
//         <motion.div className="card" whileHover={{ scale: 1.05 }}>
//           <Link to="/emi-calculator">
//             <img src="/assets/emi.jpg" alt="EMI Calculator" />
//             <h3>Use EMI Calculator</h3>
//           </Link>
//         </motion.div>
//       </div>

//       {/* Testimonials Slider */}
//       <div className="testimonials-slider">
//         <h2>What Our Clients Say</h2>
//         <div className="testimonial-cards">
//           {testimonials.map((t) => (
//             <motion.div className="testimonial-card" key={t.id} whileHover={{ scale: 1.02 }}>
//               <p>{t.text}</p>
//               <h4>- {t.name}</h4>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
