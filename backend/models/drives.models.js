import mongoose from "mongoose";

const driveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Drive = mongoose.model("Drive", driveSchema);

export default Drive;
