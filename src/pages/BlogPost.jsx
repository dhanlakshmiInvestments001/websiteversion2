import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import "./BlogPost.css";

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [found, setFound] = useState(false);

  // Try each possible collection
  const collections = ["homeBlogs", "aboutBlogs", "servicesBlogs"];

  useEffect(() => {
    const fetchBlog = async () => {
      for (const col of collections) {
        const docRef = doc(db, col, id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setBlog(snapshot.data());
          setFound(true);
          break;
        }
      }
    };
    fetchBlog();
  }, [id]);

  if (!found) return <p className="loading">Loading blog post...</p>;
  if (!blog) return <p className="error">Blog not found.</p>;

  return (
    <div className="blog-post-container">
      <h1>{blog.title}</h1>
      <img src={blog.imageURL} alt={blog.title} className="blog-image" />
      <p className="blog-content">{blog.description}</p>
    </div>
  );
}

export default BlogPost;
