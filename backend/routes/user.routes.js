import express from "express"
import { addStudent, getStudentByRegno } from "../controller/drives.controller.js";


const router=express.Router();

router.post("/",addStudent);

router.post("/:regno/verify",getStudentByRegno)

export default router