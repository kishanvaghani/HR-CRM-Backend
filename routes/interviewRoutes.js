import express from "express";
import {
  getInterviews,
  createInterview,
  updateInterview,
  getInterviewById,
  deleteInterview,
  getInterviewsByFilter,
  // sendManualEmail
} from "../controllers/interviewController.js";

const router = express.Router();

router.get("/", getInterviews);
router.post("/", createInterview);
router.put("/:id", updateInterview);
router.get("/filter", getInterviewsByFilter);
router.get("/:id", getInterviewById);
router.delete("/:id", deleteInterview);
// router.post("/send-email", sendManualEmail);

export default router;
