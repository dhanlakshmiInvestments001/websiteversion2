import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "./AboutUs.css";

function AboutUs() {
  const [blogs, setBlogs] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const blogSnap = await getDocs(collection(db, "aboutBlogs"));
      const teamSnap = await getDocs(collection(db, "teamMembers"));
      setBlogs(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setTeam(teamSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div className="about-container">
      {/* Blog Cards */}
      <h2>Our Blogs</h2>
      <div className="card-row">
        {blogs.map(blog => (
          <motion.div className="card" key={blog.id} whileHover={{ scale: 1.05 }}>
            <Link to={`/blog/${blog.id}`}>
              <img src={blog.imageURL} alt={blog.title} />
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Team Members */}
      <h2>Meet Our Team</h2>
      <div className="card-row">
        {team.map(member => (
          <motion.div className="card" key={member.id} whileHover={{ scale: 1.05 }}>
            <img src={member.imageURL} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Write Testimonial Link */}
      <h2>Write a Testimonial</h2>
      <div className="card-row">
        <motion.div className="card large-card" whileHover={{ scale: 1.05 }}>
          <Link to="/write-testimonial">
            <img src="/assets/write-testimonials.jpeg" alt="Write Testimonial" />
            <h3>Share your experience with us</h3>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../firebase/config";
// import { collection, getDocs } from "firebase/firestore";
// import { motion } from "framer-motion";
// import "./AboutUs.css";

// function AboutUs() {
//   const [blogs, setBlogs] = useState([]);
//   const [team, setTeam] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const blogSnap = await getDocs(collection(db, "aboutBlogs"));
//       const teamSnap = await getDocs(collection(db, "teamMembers"));
//       setBlogs(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       setTeam(teamSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="about-container">
//       {/* Row 1: Blog Cards */}
//       <h2>Our Blogs</h2>
//       <div className="card-row">
//         {blogs.map(blog => (
//           <motion.div className="card" key={blog.id} whileHover={{ scale: 1.05 }}>
//             <Link to={`/blog/${blog.id}`}>
//               <img src={blog.imageURL} alt={blog.title} />
//               <h3>{blog.title}</h3>
//               <p>{blog.description}</p>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* Row 2: Team Members */}
//       <h2>Meet Our Team</h2>
//       <div className="card-row">
//         {team.map(member => (
//           <motion.div className="card" key={member.id} whileHover={{ scale: 1.05 }}>
//             <img src={member.imageURL} alt={member.name} />
//             <h3>{member.name}</h3>
//             <p>{member.role}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Row 3: Write Testimonial */}
//       <h2>Write a Testimonial</h2>
//       <div className="card-row">
//         <motion.div className="card large-card" whileHover={{ scale: 1.05 }}>
//           <Link to="/write-testimonial">
//             <img src="/assets/write-testimonial.jpg" alt="Write Testimonial" />
//             <h3>Share your experience with us</h3>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default AboutUs;
