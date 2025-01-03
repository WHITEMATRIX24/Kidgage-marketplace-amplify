import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import "./SignUpForm.css"; // Assuming you have a CSS file for styling

const PersonalSignIn = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://www.kidgage.com/api/personal/signin",
        formData
      );
      console.log("Sign-in successful:", response.data);
      setSuccess("Sign-in successful");
      setFormData({
        emailOrPhone: "",
        password: "",
      });
    } catch (error) {
      console.error(
        "Sign-in error:",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response
          ? error.response.data.message
          : "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="form-body">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Personal Sign-In</h2>
        <label>Email or Phone Number</label>
        <input
          type="text"
          name="emailOrPhone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          placeholder="E-mail ID or Phone Number"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <Button primary type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default PersonalSignIn;
