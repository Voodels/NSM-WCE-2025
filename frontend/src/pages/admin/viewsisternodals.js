import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const ViewSisterNodals = () => {
  const [nodes, setNodes] = useState([]);

  const fetchNodes = async () => {
    const res = await axios.get("http://localhost:5000/api/sisternodal");
    setNodes(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this nodal center?")) {
      await axios.delete(`http://localhost:5000/api/sisternodal/${id}`);
      fetchNodes();
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Manage Sister Nodal Centers</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {nodes.map((node) => (
          <div key={node._id} style={{ textAlign: "center" }}>
            <img
              src={`http://localhost:5000/uploads/${node.photo}`}
              alt={node.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <p>{node.name}</p>
            <button
              onClick={() => handleDelete(node._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
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

export default ViewSisterNodals;
