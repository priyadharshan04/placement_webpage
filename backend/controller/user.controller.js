import Studentauth from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import cookie from 'cookie';

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

    // Generate JWT token with regno
    const token = jwt.sign(
      { _id: student._id, regno: student.regno, admin: student.admin },
      process.env.JWT_SECRET,
      { expiresIn: '100h' }
    );

    // Set token and regno in cookies
    res.setHeader('Set-Cookie', [
      cookie.serialize('token', token, {
        httpOnly: true, // Ensure the cookie is not accessible via client-side JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure flag in production
        maxAge: 3600 * 100, // Set cookie expiration time in seconds
        path: '/', // Make the cookie available on all routes
        sameSite: 'strict', // Prevent CSRF
      }),
    
    ]);

    // Respond with student details (excluding the password)
    const { _id, email, regno: studentRegno, name, admin, createdAt, updatedAt } = student;
    res.status(200).json({
      _id,
      email,
      regno: studentRegno,
      name,
      admin,
      createdAt,
      updatedAt
    });
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
  export const getStudentDetails = async (req, res) => {
    try {
      // Extract token from cookies
      const token = req.cookies?.token;

  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }
  
      // Verify the token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
  
      const { regno } = decoded; // Extract regno from the token payload
  
      // Find the student by registration number and exclude the password
      const student = await Studentauth.findOne({ regno }).select("-password");
  
      // If the student is not found, return a 404 response
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Respond with the student details
      res.status(200).json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  