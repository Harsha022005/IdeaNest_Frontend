import express from 'express';
import { Signup, login } from './authcontroller.js';
const router = express.Router();

// Define signup and login routes with correct path syntax
router.post("/api/signup", Signup);
router.post("/api/login", login);

export default router;