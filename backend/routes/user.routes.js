import express from "express"
import { addStudent, getStudentByRegno, getStudentDetails } from "../controller/user.controller.js";
import verifyToken from "../middleware/authmiddle.js";


const router=express.Router();

router.post("/",addStudent);

router.post("/:regno/verify",getStudentByRegno)

router.get("/details",getStudentDetails)

export default router