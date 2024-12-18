import { useState } from "react";
import axios from "axios";
import Input from "../../styled_components/input.jsx";
import Button from "../../styled_components/button.styled-component.jsx";
import "./drive.edit.css";

const FetchDrive = () => {
  const [name, setName] = useState(""); // State for the drive name
  const [isdrive, setisdrive] = useState(false);
  const [drive, setDrive] = useState(null); // State for the drive data
  const [message, setMessage] = useState(null); // State to show success or error message
  const [isEditing, setIsEditing] = useState(false); // State for toggling the edit mode
  const [editedDrive, setEditedDrive] = useState({
    name: "",
    time: "",
    image: "",
    description: "",
    eligibility: "",
    requirements: "",
  }); // State to store edited drive data

  // Fetch drive data from the server
  const fetchDriveData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/drives/name/${name}`);
      setDrive(response.data);
      setisdrive(true); // Set the fetched drive data
      setMessage(null);
    } catch (err) {
      setDrive(null);
      setMessage(`Error: Could not fetch drive. ${err.response?.data?.message || err.message}`);
    }
  };

  // Handle form submission for fetching data
  const handleFetch = (e) => {
    e.preventDefault();
    if (name.trim()) {
      fetchDriveData();
    } else {
      setMessage("Please enter a valid Drive Name.");
    }
  };

  // Toggle edit mode and set initial values for editing
  const handleEdit = () => {
    setIsEditing(true);
    setEditedDrive({
      name: drive.name,
      time: new Date(drive.time).toISOString().slice(0, 16), // Format for datetime-local
      image: drive.image,
      description: drive.description,
      eligibility: drive.eligibility,
      requirements: drive.requirements,
    });
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDrive((prev) => ({ ...prev, [name]: value }));
  };

  // Update drive details on the server
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/drives/${drive._id}`, editedDrive);
      setDrive(response.data); // Update the drive with the edited data
      setIsEditing(false); // Exit edit mode
      setisdrive(false);
      setMessage("Drive details updated successfully!");
    } catch (err) {
      setMessage(`Error: Could not update drive. ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="drive-fetch-container">
      <h2 className="title">Fetch Drive Information</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleFetch} className="drive-form">
        <div className="form-group">
          <Input
            type="text"
            id="name"
            placeholder="Enter Drive Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
            label="Drive Name:"
          />
          <Button type="submit" name="Fetch" />
        </div>
      </form>

      {drive && isdrive && (
        <div className="drive-details">
          <div className="drive-detail-update">
          <h3>Drive Details</h3>
          <p><strong>Name:</strong> {drive.name}</p>
          <p><strong>Time:</strong> {new Date(drive.time).toLocaleString()}</p>
          <p><strong>Image:</strong> <img src={drive.image} alt={drive.name} className="drive-image" style={{ width: '90px', height: 'inherit' }} /></p>
          <p><strong>Description:</strong> {drive.description}</p>
          <p><strong>Eligibility:</strong> {drive.eligibility}</p>
          <p><strong>Requirements:</strong> {drive.requirements}</p>
          </div>
          {/* Edit Button */}
          {!isEditing && <Button type="button" name="Edit" onClick={handleEdit} />}

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <Input
                  type="text"
                  id="name"
                  name1="name"
                  placeholder="Name"
                  value={editedDrive.name}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Name:"
                />
              </div>
              <div className="form-group">
             
                <input
                  type="datetime-local"
                  id="time"
                  name="time"
                  placeholder="Time"
                  value={editedDrive.time}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Time:"
                />
              </div>
              <div className="form-group">
                <Input
                  type="url"
                  id="image"
                  name1="image"
                  placeholder="Image URL"
                  value={editedDrive.image}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Image URL:"
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  id="description"
                  name1="description"
                  placeholder="Description"
                  value={editedDrive.description}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Description:"
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  id="eligibility"
                  name1="eligibility"
                  placeholder="Eligibility"
                  value={editedDrive.eligibility}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Eligibility:"
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  id="requirements"
                  name1="requirements"
                  placeholder="Requirements"
                  value={editedDrive.requirements}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  label="Requirements:"
                />
               
              </div>
              <Button type="submit" name="Update"/>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchDrive;
