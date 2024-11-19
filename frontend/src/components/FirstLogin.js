import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logooo from "../components/assets/images/KIDGAGElogo.png";
import bannerimggg from "../components/assets/images/Kidgage_Landingpage_Prelaunch.png";

export default function FirstLogin() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For showing/hiding loader
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch(
        "https://16.171.204.252/api/users/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("Email sent successfully!");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send email");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  // Dummy credentials
  const dummyCredentials = {
    name: "Kidgage@2024",
    password: "Kidgage@24user",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loader

    // Simulate form validation with dummy data
    if (
      formData.name === dummyCredentials.name &&
      formData.password === dummyCredentials.password
    ) {
      setLoading(false); // Stop loader
      navigate("/home");
    } else {
      setError("Invalid username or password");
      setLoading(false); // Stop loader if there's an error
    }
  };
  return (
    <div
      className="container-fluid px-3 px-md-5 mt-3 mt-md-5"
      style={{ minHeight: "100vh" }}
    >
      {/* Main Row for Grid System */}
      <div className="row">
        {/* Empty Columns */}
        <div className="col-12 col-md-1"></div>

        {/* Content Section */}
        <div className="col-12 col-md-10 px-3 px-md-0 ">
          <div className="ms-3">
            <div style={{ width: "auto" }} className="ms-4 ms-md-5 mb-0 mt-3">
              <img
                src={logooo}
                alt="Kid with tablet"
                className="img-fluid rounded"
                style={{ maxWidth: "15%" }}
              />
            </div>
          </div>
          <br></br>
          {/* Top Section */}
          <div
            className="row align-items-center min-vh-75"
            style={{ minHeight: "75vh" }}
          >
            {/* Left Section (Image) */}
            <div className="col-12 me-0  col-lg-6 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
              <img
                src={bannerimggg}
                alt="Kid with tablet"
                className="img-fluid rounded"
                style={{ width: "130%", maxWidth: "120%" }}
              />
            </div>

            {/* Right Section (Text and Email Input) */}
            <div className="col-12 col-lg-6">
              <h1
                className="mb-4 mt-5 fw-bolder"
                style={{ fontSize: "2.5rem", color: "#000" }}
              >
                Kids Stuck to Screens?
                <br />
                Don't worry, We've <br></br> got an App for that
              </h1>
              <p
                className="mb-5"
                style={{ fontSize: "1.1rem", color: "#6c757d" }}
              >
                A smarter way to nurture your child's growth <br></br> and
                well-being. Join us in this journey of play, <br></br> progress,
                and purpose.
              </p>
              <div className="mb-5">
                <h5
                  className="mb-2 mt-2 fw-semibold"
                  style={{ fontSize: "1.5rem", color: "#000" }}
                >
                  Get Early Access
                </h5>
                <p className="mb-3" style={{ color: "#6c757d" }}>
                  Be the first to know when we launch! Join <br></br> our
                  exclusive waitlist to stay updated on <br></br> Kidgage and
                  secure early access.
                </p>
                <div className="d-flex align-items-center">
                  <input
                    type="email"
                    className="form-control w-20 me-2"
                    placeholder="Enter Your Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                      padding: "10px",
                      width: "350px",
                    }}
                  />
                  <button
                    className="btn text-white p-2 w-30"
                    style={{ backgroundColor: "#ACC29E" }}
                    onClick={sendEmail}
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="row mt-0 ms-0 ms-md-5 gy-4 mb-5">
            <div className="col-12 col-sm-6 col-lg-3">
              <h5 className="fw-bold">For Parents</h5>
              <p>
                Discover creative ways to support your child's growth with a
                platform where fun meets development – all in one place!
              </p>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <h5 className="fw-bold">For Providers</h5>
              <p>
                Partner with us to connect with families who value growth and
                health. Together, let's inspire progress and create brighter
                futures for the next generation!
              </p>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <h5 className="fw-bold">Already Invited?</h5>
              <p>
                Enter your email and password to help us test the platform in
                closed beta.
              </p>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              <input
                name="name"
                type="text"
                className="form-control mb-2"
                placeholder="Username"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                name="password"
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                className="btn p-2 w-100 text-white"
                style={{ backgroundColor: "#ACC29E" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <h5 className="fw-bold">Follow us</h5>
              <p>
                <a
                  href="Instagram.com/mykidgage"
                  className="text-decoration-none d-block text-dark"
                >
                  Instagram
                </a>
                <a href="#" className="text-decoration-none d-block text-dark">
                  Facebook
                </a>
                <a href="#" className="text-decoration-none d-block text-dark">
                  LinkedIn
                </a>
                <a href="#" className="text-decoration-none d-block text-dark">
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Empty Columns */}
        <div className="col-12 col-md-1"></div>
      </div>
    </div>
  );
}
