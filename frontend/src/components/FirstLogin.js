import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logooo from "../components/assets/images/KIDGAGElogo.png";
import bannerimggg from "../components/assets/images/kid.jpg";
import "./FirstLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function FirstLogin() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        "https://www.kidgage.com/api/users/send-email",
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
    setLoading(true);

    if (
      formData.name === dummyCredentials.name &&
      formData.password === dummyCredentials.password
    ) {
      setLoading(false);
      navigate("/home");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      className="container-fluid px-5 px-md-6 mt-3 mt-md-5"
      style={{
        minHeight: "100vh",
        fontFamily: "'Gilroy', sans-serif",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <style>
        {`
          @import url('https://fonts.cdnfonts.com/css/gilroy-bold');
        `}
      </style>
      <motion.div className="row" variants={containerVariants}>
        <div className="col-12 col-lg-10 mx-auto px-0 d-flex flex-column">
          <motion.div
            className="ms-0 d-flex align-items-center justify-content-between"
            variants={imageVariants}
          >
            <div style={{ width: "auto" }} className="ms-0 ms-md-1 mb-0 mt-3">
              <img
                src={logooo}
                alt="Kidgage Logo"
                className="kidlogo img-fluid rounded"
              />
            </div>
            <div className="firstPageLogoContainer d-flex gap-3">
              <a
                href="http://Instagram.com/mykidgage"
                className="text-decoration-none d-block text-dark"
              >
                <FontAwesomeIcon icon={faInstagram} size="2xl" />
              </a>
              <a
                href="https://www.linkedin.com/company/kidgage"
                className="text-decoration-none d-block text-dark"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2xl" />
              </a>
            </div>
          </motion.div>
          <br />
          <motion.div
            className="row align-items-center"
            // style={{ minHeight: "75vh" }}
            variants={containerVariants}
          >
            <motion.div
              className="col-12 col-lg-6 d-flex justify-content-start align-items-center mb-4 mb-lg-0"
              variants={imageVariants}
            >
              <div
                className="position-relative landingpageBannerContainer"
                // style={{
                //  width: "100%",
                //  maxWidth: "500px",
                // paddingBottom: "66.67%",
                //}}
              >
                <img
                  src={bannerimggg}
                  alt="Kid with tablet"
                  className="rounded object-fit-contain w-100 h-100"
                />
              </div>
            </motion.div>
            <motion.div
              className="col-12 col-lg-6 ps-3 ps-lg-5"
              variants={itemVariants}
            >
              <motion.h1
                className="mb-4 mt-5 fw-bolder"
                style={{
                  fontSize: "30px",
                  color: "#000",
                  fontFamily: "gilroy-bold",
                }}
                variants={itemVariants}
              >
                Kids Stuck to Screens?
                <br />
                Don't worry, We've <br /> got an App for that
              </motion.h1>
              <motion.p
                className="mb-5"
                style={{
                  // fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
                  fontFamily: "gilroy-regular",
                }}
                variants={itemVariants}
              >
                A smarter way to nurture your child's growth <br /> and
                well-being. Join us in this journey of play, <br /> progress,
                and purpose.
              </motion.p>
              <motion.div className="mb-md-5" variants={itemVariants}>
                <motion.h5
                  className="mb-2 mt-2 fw-semibold"
                  style={{
                    fontSize: "1.5rem",
                    color: "#000",
                    fontFamily: "gilroy-bold",
                  }}
                  variants={itemVariants}
                >
                  Get Early Access
                </motion.h5>
                <motion.p
                  className="mb-3"
                  style={{ fontFamily: "gilroy-regular" }}
                  variants={itemVariants}
                >
                  Be the first to know when we launch! Join <br /> our exclusive
                  waitlist to stay updated on <br /> Kidgage and secure early
                  access.
                </motion.p>
                <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center">
                  <input
                    type="email"
                    className="form-control mb-2 mb-sm-0 me-sm-2"
                    placeholder="Enter Your Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                      padding: "10px",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  />
                  <button
                    className="btn text-white p-2 w-100 w-sm-auto"
                    style={{
                      backgroundColor: "#ACC29E",
                      minWidth: "80px",
                      maxWidth: "90px",
                    }}
                    onClick={sendEmail}
                  >
                    <span className="d-flex gap-3 align-items-center">
                      Send
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="row mt-4 mx-0 gy-4 mb-5"
            variants={containerVariants}
          >
            <motion.div
              className="col-12 col-sm-6 col-lg-3 ps-0 ps-lg-0 pe-5"
              variants={itemVariants}
            >
              <h5 className="fw-bold" style={{ fontFamily: "gilroy-bold" }}>
                For Parents
              </h5>
              <p style={{ fontFamily: "gilroy-regular" }}>
                Discover creative ways to support your child's growth with a
                platform where fun meets development – all in one place!
              </p>
            </motion.div>
            <motion.div
              className="col-12 col-sm-6 col-lg-3 ps-0 ps-lg-0"
              style={{ paddingRight: "4rem" }}
              variants={itemVariants}
            >
              <h5 className="fw-bold" style={{ fontFamily: "gilroy-bold" }}>
                For Providers
              </h5>
              <p style={{ fontFamily: "gilroy-regular" }}>
                Partner with us to connect with families who value growth and
                health. Together, let's inspire progress and create brighter
                futures for the next generation!
              </p>
            </motion.div>
            <motion.div
              className="col-12 col-sm-6 col-lg-2 ps-0 ps-lg-0 pe-3"
              variants={itemVariants}
            >
              <h5 className="fw-bold" style={{ fontFamily: "gilroy-bold" }}>
                Already Invited?
              </h5>
              <p style={{ fontFamily: "gilroy-regular" }}>
                Enter your email and password to help us test the platform in
                closed beta.
              </p>
            </motion.div>
            <motion.div
              className="col-12 col-sm-6 col-lg-4 ps-0 ps-lg-0"
              variants={itemVariants}
            >
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              <input
                name="name"
                type="text"
                className="form-control mb-2 firstPageLoginUserName"
                placeholder="Username"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                name="password"
                type="password"
                className="form-control mb-2 firstPageLoginPassword"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                className="btn p-2 text-white firstPageLoginButton"
                style={{ backgroundColor: "#ACC29E" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {/* <h5 className="fw-bold" style={{ fontFamily: "gilroy-bold" }}>
                Follow us
              </h5>
              <p style={{ fontFamily: "gilroy-regular" }}>
                <a
                  href="http://Instagram.com/mykidgage"
                  className="text-decoration-none d-block text-dark"
                >
                  Instagram
                </a>

                <a
                  href="https://www.linkedin.com/company/kidgage"
                  className="text-decoration-none d-block text-dark"
                >
                  LinkedIn
                </a>

              </p> */}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
