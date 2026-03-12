import express from "express";
import {
  getUsers,
  addFuncionarios,
  updateFuncionarios,
  deleteFuncionarios
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);             
router.post("/", addFuncionarios);    
router.put("/:id", updateFuncionarios); 
router.delete("/:id", deleteFuncionarios);

export default router;