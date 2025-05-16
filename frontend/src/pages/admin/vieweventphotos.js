import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const ViewEventPhotos = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    const res = await axios.get("http://localhost:5000/api/eventphotos");
    setPhotos(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this photo?")) {
      await axios.delete(`http://localhost:5000/api/eventphotos/${id}`);
      fetchPhotos();
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Manage Event Photos</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {photos.map((photo) => (
          <div key={photo._id} style={{ textAlign: "center" }}>
            <img
              src={`http://localhost:5000/uploads/${photo.filename}`}
              alt="event"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <p></p>
            <button
              onClick={() => handleDelete(photo._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                marginTop: "8px",
                padding: "5px 10px",
                borderRadius: "5px",
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

export default ViewEventPhotos;
