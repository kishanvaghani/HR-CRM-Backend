import mongoose from "mongoose";

// This model aggregates data for dashboard
const dashboardSchema = new mongoose.Schema({
  totalCandidates: {
    type: Number,
    default: 0
  },
  scheduledInterviews: {
    type: Number,
    default: 0
  },
  completedInterviews: {
    type: Number,
    default: 0
  },
  pendingReviews: {
    type: Number,
    default: 0
  },
  monthlyStats: [{
    month: String,
    interviews: Number,
    candidates: Number
  }],
  statusDistribution: [{
    status: String,
    count: Number,
    color: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model("Dashboard", dashboardSchema);