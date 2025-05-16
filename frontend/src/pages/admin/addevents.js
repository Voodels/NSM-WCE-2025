import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AddEvent = () => {
  const [formData, setFormData] = useState({ title: "", month: "", year: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("month", formData.month);
    data.append("year", formData.year);
    data.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/events", data);
      setMessage("Event added successfully!");
      setError(false);
      setFormData({ title: "", month: "", year: "" });
      setFile(null);
    } catch (err) {
      setMessage("Failed to add event");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.container}>
      <h3>Add Event Report</h3>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Month"
        value={formData.month}
        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
        required
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Year"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        required
        style={styles.input}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        <FaUpload /> Upload
      </button>

      {message && (
        <div style={{ ...styles.message, ...(error ? styles.error : styles.success) }}>
          {error ? <FaTimesCircle /> : <FaCheckCircle />} {message}
        </div>
      )}
    </form>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" },
  input: { padding: "10px", marginBottom: "10px", borderRadius: "4px", width: "100%" },
  button: { padding: "10px", backgroundColor: "#004080", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  message: { marginTop: "10px", padding: "10px", borderRadius: "4px" },
  success: { backgroundColor: "#d4edda", color: "#155724" },
  error: { backgroundColor: "#f8d7da", color: "#721c24" },
};

export default AddEvent;
