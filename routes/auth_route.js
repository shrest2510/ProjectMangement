import { Router } from "express";
import { registereduser } from "../controllers/auth.js";
const router = Router();

router.post('/register', registereduser); // middleware function to handle POST requests to the /register path of the auth route, it will call the registereduser function from the controller and return the response.

//router.route("/api/auth/verify-email").post(registereduser); // middleware function to handle POST requests to the /register path of the auth route, it will call the registereduser function from the controller and return the response.

export default router; // export router with all routes included