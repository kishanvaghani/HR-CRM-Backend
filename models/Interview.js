import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    candidate: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,           
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,           
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    meetingLink: {
      type: String,
      default: "",
    },
    status: {
      type: String,
    },
    round: {
      type: String,
    },
    currentCTC: {
      type: Number,
      default: null,
    },
    expectedCTC: {
      type: Number,
      default: null,
    },
    totalExperience: {
      type: Number,
      default: null,
    },
    dateOfJoining: {
      type: String,
      default: "",
    },
    noticePeriod: {
      type: Number,
      default: null,
    },
    currentCompany: {
      type: String,
      default: "",
    },
    
    emailSent: {
      type: Boolean,
      default: false
    },
    lastEmailRound: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

interviewSchema.index({ email: 1 });
interviewSchema.index({ status: 1 });
interviewSchema.index({ round: 1 });

export default mongoose.model("Interview", interviewSchema);