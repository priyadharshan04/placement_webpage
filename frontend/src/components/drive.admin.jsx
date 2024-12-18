import { useState } from "react";
import axios from "axios";
import "./drive.admin.add.css"; // Importing the CSS file
import Input from "../../styled_components/input";
import Button from "../../styled_components/button.styled-component";

const AddDrive = () => {
  const [name, setName] = useState(""); // State for the drive name
  const [time, setTime] = useState(""); // State for the drive time
  const [image, setImage] = useState(""); // State for the image URL
  const [description, setDescription] = useState(""); // State for the description
  const [eligibility, setEligibility] = useState(""); // State for eligibility
  const [requirements, setRequirements] = useState(""); // State for requirements
  const [message, setMessage] = useState(null); // State to show success or error message

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post new drive data to the backend
      const response = await axios.post("http://localhost:5000/api/drives", {
        name,
        time,
        image,
        description,
        eligibility,
        requirements,
      });

      if (response.status === 201) {
        setMessage("Drive added successfully!");
        // Reset form fields
        setName("");
        setTime("");
        setImage("");
        setDescription("");
        setEligibility("");
        setRequirements("");
      } else {
        setMessage("Failed to add the drive.");
      }
    } catch (err) {
      setMessage(`Error: Could not add drive. ${err.message}`);
    }
  };

  return (
    <div className="drive-input-container">
      <h2 className="title">Add a New Drive</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="drive-form">
        <div className="form-group">
          <Input
            type="text"
            id="name"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="NAME"
            required
          />
        </div>

        <div className="form-group">
          <input className="form-input"
            type="datetime-local"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            label="TIME"
            required
          />
        </div>

        <div className="form-group">
          <Input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            label="IMAGE-URL"
            required
            placeholder="http://..."
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            id="description"
            placeholder="DESCRIPTION"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="DESCRIPTION"
            required
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            id="eligibility"
            placeholder="ELIGIBILITY"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            label="ELIGIBILITY"
            required
          />
        </div>

        <div className="form-group">
          <Input
            type="text"
            id="requirements"
            placeholder="REQUIREMENTS"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            label="REQUIREMENTS"
            required
          />
        </div>

        <Button type="submit" name="ADD" />
      </form>
    </div>
  );
};

export default AddDrive;
