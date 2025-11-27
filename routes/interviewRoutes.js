import express from "express";
import {
  getInterviews,
  createInterview,
  updateInterview,
  getInterviewById,
  deleteInterview,
  getInterviewsByFilter,
  checkEmailExists,
  checkPhoneExists,
  getUpcomingInterviews

  // sendManualEmail
} from "../controllers/interviewController.js";

const router = express.Router();


router.get("/", getInterviews);
router.post("/", createInterview);
router.put("/:id", updateInterview);
router.get("/filter", getInterviewsByFilter);
router.get("/upcoming", getUpcomingInterviews);
router.get("/:id", getInterviewById);
router.delete("/:id", deleteInterview);
router.post("/check-email", checkEmailExists);
router.post("/check-phone", checkPhoneExists);

export default router;
