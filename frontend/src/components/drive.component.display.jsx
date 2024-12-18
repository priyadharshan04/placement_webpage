import { useState,useEffect } from "react";
import axios from "axios";
import Displaycss from "../styles/drive.module.css"; // Link to your CSS file for styling
import Buttonexplore from "../../styled_components/button.explore.jsx";

const DriveList = () => {
  const [drives, setDrives] = useState([]); // Store fetched drives
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [selectedDrive, setSelectedDrive] = useState(null); // Store the selected drive

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/drives");
        if (response.status === 200) {
          setDrives(response.data); // Update drives data
        } else {
          throw new Error("Unexpected response from the server");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch drives");
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  // Loading and Error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Open the modal with selected drive details
  const openModal = (drive) => {
    setSelectedDrive(drive);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDrive(null);
  };

  return (
    <div className={ Displaycss.drivecontainer}>
      <h2 className={ Displaycss.driveheading}>Ongoing interview drives</h2>
      <ul className={ Displaycss.drivelist}>
        {drives.map((drive) => (
          <li className={ Displaycss.driveitem} key={drive._id}>
            <img
              className={ Displaycss.drivelogo}
              src={drive.image}
              alt={drive.name || "Company Logo"}
            />
            <div className={ Displaycss.drivedisplaydetails}>
              <h3 className={ Displaycss.drivename}>{drive.name}</h3>
              <p className={ Displaycss.drivetime}>{new Date(drive.time).toLocaleString()}</p>
              <button
                className={ Displaycss.drivelistbutton}
                onClick={() => openModal(drive)} // Open modal with drive details
              >
                View More
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Dialog */}
      {isModalOpen && selectedDrive && (
        <dialog open className={ Displaycss.drivedialog}>
          <button className={ Displaycss.dialogclose} onClick={closeModal}>
            
          </button>
          <img
            className={ Displaycss.modalimage}
            src={selectedDrive.image}
            alt={selectedDrive.name}
          />
          <h3 className={ Displaycss.dialogtitle}>{selectedDrive.name}</h3>
          <p><strong className={ Displaycss.heading}>Time:</strong> {new Date(selectedDrive.time).toLocaleString()}</p>
         
          <p><strong className={ Displaycss.heading}>Description:</strong> {selectedDrive.description}</p>
          <p><strong className={ Displaycss.heading}>Eligibility:</strong> {selectedDrive.eligibility}</p>
          <p><strong className={ Displaycss.heading}>Requirements:</strong> {selectedDrive.requirements}</p>
<Buttonexplore/>
        </dialog>
      )}
    </div>
  );
};

export default DriveList;
