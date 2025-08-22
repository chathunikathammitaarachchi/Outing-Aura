import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RLoginForm.css";
import logoImage from "../assets/logo.jpg";
import mailIcon from "../assets/user images/mailicon.png";
import eyeIcon from "../assets/user images/eye-icon.png";




const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", formData);
      const userDetails = response.data;

      // Get the user's category and convert to lowercase for consistency
      const category = userDetails.category?.toLowerCase();

      // Navigate based on category
      switch (category) {
        case 'cake':
          navigate('/add-package', { state: { user: userDetails } });
          break;
        case 'decoration':
          navigate('/add-package', { state: { user: userDetails } });
          break;
        case 'music':
          navigate('/add-package', { state: { user: userDetails } });
          break;
        case 'photography':
          navigate('/add-package', { state: { user: userDetails } });
          break;
        default:
          alert("Unknown category: " + category);
      }

    } catch (error) {
      alert(error.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="login-container-serviceProviders">
      {/* Left Section: Form */}
      <div className="form-section">
        {/* Top Image */}
        <img src={logoImage} alt="Logo" className="form-logo" />
        <h2 className="form-titlelogin">Login to OutingAura!!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-container-serviceProviders">
            <label className="form-label" htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                aria-label="Email"
              />
              <img src={mailIcon} alt="Mail Icon" className="icon mail-icon" />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-container-serviceProviders">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                aria-label="Password"
              />
              <img
                src={eyeIcon}
                alt="Toggle Password Visibility"
                className="icon eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">Login</button>
        </form>

        {/* Footer Links */}
        <p className="form-footer">
          Don't have an account? <Link to="/rsignup">Sign Up</Link>
        </p>
        <p className="form-footer">
          Forgot your password? <Link to="/reset-password">Reset Password</Link>
        </p>
      </div>

    </div>
  );
};

export default LoginForm;
