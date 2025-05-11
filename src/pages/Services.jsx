import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "./Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "servicesBlogs"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    };
    fetchServices();
  }, []);

  // Group services into chunks of 3
  const groupedServices = [];
  for (let i = 0; i < services.length; i += 3) {
    groupedServices.push(services.slice(i, i + 3));
  }

  return (
    <div className="services-container">
      <h2>Our Services</h2>

      {groupedServices.map((group, index) => (
        <div className="service-row" key={index}>
          {group.map(service => (
            <motion.div className="card" key={service.id} whileHover={{ scale: 1.05 }}>
              <Link to={`/blog/${service.id}`}>
                <img src={service.imageURL} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Services;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../firebase/config";
// import { collection, getDocs } from "firebase/firestore";
// import { motion } from "framer-motion";
// import "./Services.css";

// function Services() {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       const querySnapshot = await getDocs(collection(db, "servicesBlogs"));
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setServices(data);
//     };
//     fetchServices();
//   }, []);

//   // Split services into 2 rows
//   const row1 = services.slice(0, 3);
//   const row2 = services.slice(3, 6);

//   return (
//     <div className="services-container">
//       <h2>Our Services</h2>

//       <div className="service-row">
//         {row1.map(service => (
//           <motion.div className="card" key={service.id} whileHover={{ scale: 1.05 }}>
//             <Link to={`/blog/${service.id}`}>
//               <img src={service.imageURL} alt={service.title} />
//               <h3>{service.title}</h3>
//               <p>{service.description}</p>
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       <div className="service-row">
//         {row2.map(service => (
//           <motion.div className="card" key={service.id} whileHover={{ scale: 1.05 }}>
//             <Link to={`/blog/${service.id}`}>
//               <img src={service.imageURL} alt={service.title} />
//               <h3>{service.title}</h3>
//               <p>{service.description}</p>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Services;
