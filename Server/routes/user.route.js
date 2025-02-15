import express from "express";
import multer from 'multer';
import protectedRoute from '../middleware/protectedRoute.js';
import { getNotifications,sendNotification } from "../controllers/notification.controller.js";
import { getAllProfilesAPI } from "../utils/getAllProfile.js";
import {login,updateUserSelection,Liked_Dislike,declineVerification,changePassword,deleteverificationreq,acceptVerification,getAllUser,sendOTP,getProfileById, signup, updateUserProfileField, verifyUser, verificationreq} from "../controllers/user.controller.js";
import { runRecommend } from "../utils/runRecommend.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/updateData",getAllProfilesAPI);
router.post("/signup",upload.single('image'), signup);
router.post("/verify",upload.single('image'), verifyUser);
router.post("/accept",acceptVerification);
router.post("/decline",declineVerification);
router.post("/delete",deleteverificationreq);
router.post("/change-password",changePassword);
router.post("/update-user-selection",updateUserSelection);
router.get("/allverificationreq",verificationreq);
router.post("/login", login);
router.post("/updateUser",protectedRoute,updateUserProfileField);
router.post("/getrecommened",protectedRoute,runRecommend);
router.get("/getallusers",protectedRoute,getAllUser);
router.post("/swipe",protectedRoute,Liked_Dislike);
router.get("/getprofilebyid/:id", getProfileById);
router.get("/notification",protectedRoute,getNotifications);
router.post("/notify",sendNotification);
router.post("/send-otp",sendOTP);

export default router;