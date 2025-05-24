import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import "./WriteBlog.css";

function WriteBlog() {
  const [form, setForm] = useState({
    title: "",
    imageURL: "",
    page: "Home",
    content: "",
    replaceId: "",
  });
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async (page) => {
    const colName = getCollection(page);
    const snapshot = await getDocs(collection(db, colName));
    setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchBlogs(form.page);
  }, [form.page]);

  const getCollection = (page) => {
    if (page === "Home") return "homeBlogs";
    if (page === "About Us") return "aboutBlogs";
    if (page === "Services") return "servicesBlogs";
    return "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colName = getCollection(form.page);

    const blogData = {
      title: form.title,
      imageURL: form.imageURL,
      description: form.content,
    };

    if (form.replaceId) {
      const docRef = doc(db, colName, form.replaceId);
      await setDoc(docRef, blogData); // Replace
      alert("Blog replaced successfully!");
    } else {
      await addDoc(collection(db, colName), blogData); // Add new
      alert("Blog added successfully!");
    }

    await fetchBlogs(form.page);
    setForm({
      title: "",
      imageURL: "",
      page: form.page,
      content: "",
      replaceId: "",
    });
  };

  const handleDelete = async (id) => {
    const colName = getCollection(form.page);
    await deleteDoc(doc(db, colName, id));
    alert("Blog deleted.");
    await fetchBlogs(form.page);
  };

  return (
    <div className="write-blog-container">
      <h2>Write a Blog</h2>
      <form onSubmit={handleSubmit} className="write-blog-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={handleChange}
          required
        />
        <select name="page" value={form.page} onChange={handleChange}>
          <option>Home</option>
          <option>About Us</option>
          <option>Services</option>
        </select>

        {blogs.length > 0 && (
          <>
            <label>Replace an existing blog:</label>
            <select
              name="replaceId"
              value={form.replaceId}
              onChange={handleChange}
            >
              <option value="">(Optional) Choose blog to replace</option>
              {blogs.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
          </>
        )}

        <textarea
          name="content"
          placeholder="Content..."
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className="blog-panel">
  <h3>All Blogs in "{form.page}" Page</h3>
  <ul className="blog-list">
    {blogs.map((b) => (
      <li key={b.id}>
        <strong>{b.title}</strong>
        <button onClick={() => handleDelete(b.id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>


    </div>
  );
}

export default WriteBlog;



// import React, { useState } from "react";
// import { db } from "../firebase/config";
// import { collection, addDoc } from "firebase/firestore";
// import "./WriteBlog.css";

// function WriteBlog() {
//   const [form, setForm] = useState({
//     title: "",
//     imageURL: "",
//     page: "Home",
//     content: ""
//   });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     let targetCollection = "";
//     if (form.page === "Home") targetCollection = "homeBlogs";
//     else if (form.page === "About Us") targetCollection = "aboutBlogs";
//     else if (form.page === "Services") targetCollection = "servicesBlogs";

//     await addDoc(collection(db, targetCollection), {
//       title: form.title,
//       imageURL: form.imageURL,
//       description: form.content
//     });

//     alert("Blog added successfully!");
//     setForm({ title: "", imageURL: "", page: "Home", content: "" });
//   };

//   return (
//     <div className="write-blog-container">
//       <h2>Write a Blog</h2>
//       <form onSubmit={handleSubmit} className="write-blog-form">
//         <input
//           type="text"
//           name="title"
//           placeholder="Blog Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="imageURL"
//           placeholder="Image URL"
//           value={form.imageURL}
//           onChange={handleChange}
//           required
//         />
//         <select name="page" value={form.page} onChange={handleChange}>
//           <option>Home</option>
//           <option>About Us</option>
//           <option>Services</option>
//         </select>
//         <textarea
//           name="content"
//           placeholder="Content..."
//           rows="6"
//           value={form.content}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Blog</button>
//       </form>
//     </div>
//   );
// }

// export default WriteBlog;
