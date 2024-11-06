import express from "express";
import {
    AuthController,
    UserController
} from "../controllers";

let authAPI = express.Router();

let authAPIRoute = (app) => {
    authAPI.post("/login", new AuthController().loginUser);
    authAPI.post("/regist", new AuthController().registerUser);
    authAPI.get("/verify-email/:token", new AuthController().verifyEmail);
    authAPI.post("/reset-password", new AuthController().requestPasswordReset);
    authAPI.post("/change-password", new AuthController().resetPassword);

    authAPI.post("refresh-token", new AuthController().refreshAccessToken);

    return app.use("/api/v1/auth", authAPI);
}

export default authAPIRoute;
