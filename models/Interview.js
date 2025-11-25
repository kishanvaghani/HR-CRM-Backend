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
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      // match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
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
      // enum: [
      //   "Not Joined",
      //   "Lack of Knowledge",
      //   "Need to do 2nd Round",
      //   "Offer Sent",
      //   "Offer Accepted",
      //   "Offer Declined",
      // ],
      // default: "Not Joined",
    },

    round: {
      type: String,
      // default: "Pending",
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
  },
  {
    timestamps: true,
  }
);

interviewSchema.index({ email: 1 });
interviewSchema.index({ status: 1 });
interviewSchema.index({ round: 1 });

export default mongoose.model("Interview", interviewSchema);
