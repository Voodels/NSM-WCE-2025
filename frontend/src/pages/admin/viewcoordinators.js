import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL=process.env.REACT_APP_STATIC_URL;


const ViewCoordinators = () => {
  const [coordinators, setCoordinators] = useState([]);

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/coordinators`);
      setCoordinators(res.data);
    } catch (err) {
      console.error("Error fetching coordinators:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coordinator?")) {
      try {
        await axios.delete(`${API_BASE_URL}/coordinators/${id}`);
        fetchCoordinators();
      } catch (err) {
        console.error("Error deleting coordinator:", err);
      }
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Coordinators</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {coordinators.map((coordinator) => (
          <div
            key={coordinator._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              position: "relative",
            }}
          >
            <img
              src={`${STATIC_BASE_URL}/uploads/${coordinator.photo}`}
              alt={coordinator.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{coordinator.name}</p>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{coordinator.email}</p>
            <button
              onClick={() => handleDelete(coordinator._id)}
              style={{
                backgroundColor: "#cc0000",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCoordinators;
