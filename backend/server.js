import express from "express";
import dotenv from "dotenv";
import connectDB from "./CONFIG/db.js";
import driveRoutes from"./routes/drives.routes.js"
import studentRoutes from "./routes/user.routes.js"
import cors from "cors";


import cookieParser from "cookie-parser"

dotenv.config();

const app = express();

// Middleware to parse JSON request body
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();
app.use(cors());

app.use("/api/drives",driveRoutes)
app.use("/api/studentauth",studentRoutes)


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error(`Failed to start server: ${err.message}`);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.http://localhost:${PORT}`);
  }
});
