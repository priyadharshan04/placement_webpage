import { useState } from "react";
import axios from "axios";
import  Logincss from "../styles/login.module.css"// Import the CSS file
import Input from "../../styled_components/input.login.jsx";
import Button from "../../styled_components/login.button.jsx";

const UserLogin = () => {
  const [formData, setFormData] = useState({ regno: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset the success message
    setLoading(true);

    try {
      // Make a POST request to the API
      const response = await axios.post(
        `http://localhost:5000/api/studentauth/${formData.regno}/verify`,
        { password: formData.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Use the regno from response to customize the success message

      const name=response.data.name;
      setSuccessMessage(`welcome ${name}!`);
      console.log({successMessage});
    } catch (err) {
      if (err.response && err.response.data.message) {
        // Handle API error response
        setError(err.response.data.message);
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (<div className={Logincss.logincomponent}>
    <div className={Logincss.verifystudentcontainer}>
      <img src="./src/assets/sjce_logo.jpg" alt="" className={Logincss.loginlogo}/>
      <h2>St. Joseph&apos;s College of Engineering</h2>
      <center><p>Off, Old Mahabalipuram Road, Kamaraj Nagar, Semmancheri, Chennai, Tamil Nadu 600119</p></center>
      {error && <p className={Logincss.errormessage}>{error}</p>}
      {/* {successMessage && <p className="success-message">{successMessage}</p>} Display success message */}

      
    </div>
    <form onSubmit={handleSubmit}>
        <div className={Logincss.loginformgroup}>
          <h3>Sign in</h3>
          
          <Input
            type="number"
            id="regno"
            name="regno"
            value={formData.regno}
            onChange={handleChange}
            required
          
            label="Registration Number:"
          />
        </div>
        <div className={Logincss.loginformgroup}>
          
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            
            label="Password"
          />
        </div>
        <Button
          type="submit"
         
          disabled={loading}
        >
        </Button>
      </form>
    </div>
  );
};

export default UserLogin;
