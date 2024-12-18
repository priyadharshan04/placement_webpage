import  { useState } from 'react';

import Input from "../../styled_components/input";
const TestComponent = () => {
  const [editedDrive, setEditedDrive] = useState({
    time: '',
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDrive((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Test Date-Time Input</h1>

      {/* Using the Input Component */}
      <Input
        type="datetime-local"
        id="time"
        name1="time"
        placeholder="Time"
        value={editedDrive.time}
        onChange={handleEditChange}
        className="form-input"
        required
        label="Time:"
      />

      <br />

      {/* Using a plain <input> element */}
      <input
        type="datetime-local"
        id="time"
        name="time"
        placeholder="Time"
        value={editedDrive.time}
        onChange={handleEditChange}
        className="form-input"
        required
      />

      <p>Selected Time: {editedDrive.time}</p>
    </div>
  );
};

export default TestComponent;
