import { useState } from "react";
import axios from "axios";
import Input from "../../styled_components/input.jsx";
import Button from "../../styled_components/button.styled-component.jsx";
import "./drive.delete.css"
 // Optional CSS file for styling

const DeleteDrive = () => {
  const [name, setName] = useState(""); // State for the drive name
  const [message, setMessage] = useState(null); // State to show success or error message

  // Handle input change
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission for deleting a drive
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (name.trim()) {
        // Send DELETE request to delete the drive by name
        const response = await axios.delete(
          `http://localhost:5000/api/drives/name/${name}`
        );
        setMessage(response.data.message); // Set success message
      } else {
        setMessage("Please enter a valid Drive Name.");
      }
    } catch (err) {
      setMessage(`Error: Could not delete drive. ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="delete-drive-container">
      <h2 className="title">Delete Drive by Name</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleDelete} className="delete-form">
        <div className="form-delete-group">
          <Input
            type="text"
            id="name"
            placeholder="Enter Drive Name"
            value={name}
            onChange={handleChange}
            className="form-input"
            required
            label="Drive Name:"
          />
          <Button type="submit" name="Delete" />
        </div>
      </form>
    </div>
  );
};

export default DeleteDrive;
