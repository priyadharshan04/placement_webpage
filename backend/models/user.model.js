import mongoose from "mongoose";
const studentSchema= new mongoose.Schema(
    {  name:{
        type:String,
        required:true,
    },
        email:{
            type:String,
            required:true
        },
        regno:{
            type:Number,
            required:true
        },
        password:{
            type:String,
            required:true,
            
        },
        admin:{
            type:Boolean,
            required:true,
        }

    },
    {
      timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);
const Studentauth=mongoose.model("Studentauth",studentSchema);
export default Studentauth
