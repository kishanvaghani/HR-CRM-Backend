import express from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getInterviewsByFilter
} from "../controllers/interviewController.js";

const router = express.Router();

router.route("/")
  .post(createInterview)
  .get(getInterviews);

router.route("/filter")
  .get(getInterviewsByFilter);

router.route("/:id")
  .get(getInterviewById)
  .put(updateInterview)
  .delete(deleteInterview);

export default router;