import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordPage.css";

function PasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (password === "admin123") {
      navigate("/cms/write");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="password-page">
      <h2>Enter Password to Access Blog Editor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default PasswordPage;
