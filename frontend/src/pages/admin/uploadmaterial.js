import React, { useState } from "react";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const UploadMaterial = () => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("openmp");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("topic", topic);
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/materials/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      setMessage(result.message);
      setError(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("Failed to upload material.");
      setError(true);
    }
  };
  
  
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Study Material</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Enter material title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={styles.input}
            required
          >
            <option value="openmp">OpenMP</option>
            <option value="mpi">MPI</option>
            <option value="cuda">CUDA</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={styles.inputFile}
          />
          {file && <p style={styles.filename}>Selected: {file.name}</p>}
        </div>

        <button type="submit" style={styles.button}>
          <FaUpload /> Upload
        </button>

        {message && (
          <div style={{ ...styles.message, ...(error ? styles.error : styles.success) }}>
            {error ? <FaTimesCircle /> : <FaCheckCircle />}
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "2rem auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#003366",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "15px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  inputFile: {
    fontSize: "14px",
    padding: "6px 0",
  },
  filename: {
    marginTop: "6px",
    color: "#555",
    fontSize: "14px",
    fontStyle: "italic",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  message: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "15px",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "500",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
};

export default UploadMaterial;
