// import express from "express";
// import {
//   createInterview,
//   getInterviews,
//   getInterviewById,
//   updateInterview,
//   deleteInterview,
//   getInterviewsByFilter
// } from "../controllers/interviewController.js";

// const router = express.Router();

// router.route("/")
//   .post(createInterview)
//   .get(getInterviews);

// router.route("/filter")
//   .get(getInterviewsByFilter);

// router.route("/:id")
//   .get(getInterviewById)
//   .put(updateInterview)
//   .delete(deleteInterview);

// export default router;


// routes/interviewRoutes.js
import express from "express";
import {
  getInterviews,
  createInterview,
  updateInterview,
  getInterviewById,
  deleteInterview,
  getInterviewsByFilter,
  sendManualEmail
} from "../controllers/interviewController.js";

const router = express.Router();

router.get("/", getInterviews);
router.post("/", createInterview);
router.put("/:id", updateInterview);
router.get("/filter", getInterviewsByFilter);
router.get("/:id", getInterviewById);
router.delete("/:id", deleteInterview);
router.post("/send-email", sendManualEmail); 

export default router;