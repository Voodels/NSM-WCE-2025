import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const STATIC_BASE_URL = process.env.REACT_APP_STATIC_URL;

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event report?")) {
      try {
        await axios.delete(`${API_BASE_URL}/events/${id}`);
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
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
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Participants</th>
            <th style={thStyle}>Summary</th>
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
              <td style={tdStyle}>{event.location}</td>
              <td style={tdStyle}>{event.participants}</td>
              <td style={tdStyle}>{event.summary}</td>
              <td style={tdStyle}>
                {event.filename ? (
                  <a
                    href={`${STATIC_BASE_URL}/uploads/${event.filename}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "No File"
                )}
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

const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const btnStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ViewEvents;
