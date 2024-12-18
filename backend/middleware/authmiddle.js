import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();




export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: "Access denied. Authorization header missing." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    if (!token) {
      return res.status(403).json({ error: "Access denied. Bearer token missing." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token provided." });
    }

    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Log detailed error for debugging
    return res.status(401).json({ error: `Invalid or expired token: ${error.message}` });
  }
};


export default verifyToken

