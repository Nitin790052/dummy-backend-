import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { validateUser } from "../middleware/validate.middleware.js";
import upload from "../../upload.js";


const router = express.Router();

// CREATE USER + IMAGE UPLOAD
router.post("/", upload.single("Image"), validateUser, createUser);

// GET USERS
router.get("/", getAllUsers);

// UPDATE USER
router.put("/:id", upload.single("Image"), validateUser, updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;