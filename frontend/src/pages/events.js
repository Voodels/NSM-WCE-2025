import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#003366" }}>Event Reports</h2>

      {events.length === 0 ? (
        <p>No events uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Month</th>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Report</th>
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
                    style={{
                      color: "#004080",
                      textDecoration: "underline",
                      fontWeight: "500",
                    }}
                  >
                    View Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  padding: "10px",
  background: "#004080",
  color: "white",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default Events;
