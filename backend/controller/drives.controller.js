import Drive from "../models/drives.models.js";
import Studentauth from "../models/user.model.js";
import bcrypt from "bcrypt"

// Controller for creating a new drive
export const createDrive = async (req, res) => {
  try {
    const { name, time, image, description, eligibility, requirements } = req.body;

    // Validate that all required fields are provided
    if (!name || !time || !image || !description || !eligibility || !requirements) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Drive document
    const newDrive = new Drive({
      name,
      time,
      image,
      description,
      eligibility,
      requirements,
    });

    // Save the new Drive to the database
    await newDrive.save();

    // Send a success response
    res.status(201).json({ message: "Drive created successfully", drive: newDrive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for updating a drive by ID
export const updateDriveById = async (req, res) => {
  try {
    const { name, time, image, description, eligibility, requirements } = req.body;

    // Update the drive by its ID
    const drive = await Drive.findByIdAndUpdate(
      req.params.id,
      { name, time, image, description, eligibility, requirements }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.status(200).json({ message: "Drive updated successfully", drive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for fetching all drives
export const getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find(); // Find all drives in the database
    res.status(200).json(drives);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for fetching a drive by ID
export const getDriveById = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id); // Find a drive by ID

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.status(200).json(drive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for deleting a drive by ID
export const deleteDriveById = async (req, res) => {
  try {
    const drive = await Drive.findByIdAndDelete(req.params.id); // Delete the drive by ID

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.status(200).json({ message: "Drive deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for deleting all drives
export const deleteAllDrives = async (req, res) => {
  try {
    await Drive.deleteMany(); // Delete all drives
    res.status(200).json({ message: "All drives deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for fetching a drive by name
export const getDriveByName = async (req, res) => {
  try {
    const drive = await Drive.findOne({ name: req.params.name }); // Find a drive by its name (case-insensitive)

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.status(200).json(drive);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for deleting a drive by name
export const deleteDriveByName = async (req, res) => {
  try {
    const drive = await Drive.findOneAndDelete({ name: req.params.name }); // Find and delete the drive by its name (case-insensitive)

    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    res.status(200).json({ message: "Drive deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getStudentByRegno = async (req, res) => {
  try {
    const { regno } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find student by registration number
    const student = await Studentauth.findOne({ regno });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Verify the password using bcrypt
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with student details (excluding the password)
    const { _id, email, regno: studentRegno,name,admin, createdAt, updatedAt } = student;
    res.status(200).json({ _id, email, regno: studentRegno,name,admin, createdAt, updatedAt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addStudent = async (req, res) => {
  try {
    const { name, email, regno, password, admin } = req.body;

    // Validate all required fields
    if (!name || !email || !regno || !password || admin === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new student with all required fields
    const newStudent = new Studentauth({
      name,
      email,
      regno,
      password: hashedPassword,
      admin, // Ensure this is included
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};