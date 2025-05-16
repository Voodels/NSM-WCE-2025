import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    id: 1,
    slug: "openmp",
    title: "OpenMP",
    description: "Learn about OpenMP models and techniques.",
  },
  {
    id: 2,
    slug: "mpi",
    title: "MPI",
    description: "Understand cloud-based architectures and virtualization.",
  },
  {
    id: 3,
    slug: "cuda",
    title: "CUDA",
    description: "Explore large-scale data processing and analysis methods.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [eventPhotos, setEventPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/eventphotos")
      .then((res) => res.json())
      .then((data) => setEventPhotos(data))
      .catch((err) => console.error("Event photos error:", err));
  }, []);

  const [importantLinks, setImportantLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/importantlinks")
      .then((res) => res.json())
      .then((data) => setImportantLinks(data));
  }, []);

  const [coordinators, setCoordinators] = useState([]);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/coordinators");
        const data = await res.json();
        setCoordinators(data);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
      }
    };

    fetchCoordinators();
  }, []);

  const [sisterCenters, setSisterCenters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sisternodal")
      .then((res) => res.json())
      .then((data) => setSisterCenters(data));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto"}}>
      {/* About Us Section */}
      <section style={{ marginTop: "20px" }}>
        <h2
          style={{
            background: "#004080",
            height: "50px",
            color: "white",
            textAlign: "center",
          }}
        >
          About Progarm
        </h2>
        <p style={{ justifyContent: "center", alignItems: "center", textJustify:"inter-word"}}>
        The <b>Faculty Development Program</b> is offered in association with <b>CDAC, Pune under the National Supercomputing Mission (NSM) activity</b>. This FDP was aimed as an introduction to those, looking at High Performance Computing from the perspective of a researchers, academician and instructor with the hands-on from Industry experts and academicians. The High Performance Computing can act as a fragment to connect various domains of science and engineering. The fundamental objective of FDP was to provide the platform for presentation, discussion and implementation of concepts in area of HPC. The attendees will be provided with depth-in knowledge of computation power, utilization and applications in the field of HPC.
        The Faculty Development Program (FDP) on OpenMP, MPI, and CUDA is proud to collaborate with esteemed organizations such as CDAC, NVidia, Intel, AMD, and renowned research organizations. These collaborations aim to bring the latest expertise, resources, and industry insights to the program, ensuring participants receive high-quality training and exposure to cutting-edge technologies. CDAC (Centre for Development of Advanced Computing) is a premier research and development organization in India, specializing in high-performance computing, software development, and advanced IT solutions. Their collaboration with the FDP brings expertise in parallel computing and access to resources that enhance the program's content and delivery 
        The key take away after attending the FDP are: 
        </p>
        <p>
        a. To introduce the fundamentals of parallel computing including parallel architectures, programming models and commonly used parallel programing 
        constructs/libraries/languages.
        </p>
        <p>
        b. To deliver hands-on sessions to provide experience applying HPC tools on both CPU and GPU platforms.
        </p>
      </section>

      {/* Image Carousel (Replace with actual carousel component later) */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          Gallery
        </h2>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {eventPhotos.map((photo, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={photo._id}
              >
                <img
                  src={`http://localhost:5000/uploads/${photo.filename}`}
                  className="d-block w-100"
                  alt={`Event ${index}`}
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Resource Section */}
      <section id="resources" style={{ marginTop: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            background: "#004080",
            height: "50px",
            color: "white",
          }}
        >
          Study Resources
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigate(`/materials/${topic.slug}`)}
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
                background: "#f9f9f9",
                width: "30%",
                textAlign: "center",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#ddd")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#f9f9f9")}
            >
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Links Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          Important Links
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {importantLinks.map((link, index) => (
            <a
              key={index}
              href={`http://localhost:5000/uploads/${link.filename}`}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px",
                background: "#f9f9f9",
                color: "black",
                border: "1px solid black",
                textDecoration: "none",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
      </section>

      {/* Coordinators Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          Coordinators
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {coordinators.map((coordinator, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={`http://localhost:5000/uploads/${coordinator.photo}`}
                alt={coordinator.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <p>{coordinator.name} </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sister Nodal Centers Section */}
      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h2 style={{ background: "#004080", height: "50px", color: "white" }}>
          Sister Nodal Centers
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {sisterCenters.map((node, index) => (
            <div key={index}>
              <a href={node.website} target="_blank" rel="noreferrer">
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
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
