import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event report?")) {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Event Reports</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Month</th>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>Report</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td style={tdStyle}>{event.title}</td>
              <td style={tdStyle}>{event.month}</td>
              <td style={tdStyle}>{event.year}</td>
              <td style={tdStyle}>
                <a
                  href={`http://localhost:5000/uploads/${event.filename}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(event._id)} style={btnStyle}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };
const btnStyle = { backgroundColor: "red", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" };

export default ViewEvents;
