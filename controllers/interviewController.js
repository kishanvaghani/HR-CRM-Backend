import Interview from "../models/Interview.js";

export const getInterviews = async (req, res) => {
  try {
    console.log("Fetching all interviews...");
    const interviews = await Interview.find().sort({ createdAt: -1 });

    console.log(`Found ${interviews.length} interviews`);

    res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching interviews",
      error: error.message,
    });
  }
};

export const createInterview = async (req, res) => {
  try {
    console.log("Creating new interview with data:", req.body);

    const interviewData = {
      candidate: req.body.candidate,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      date: req.body.date || "",
      time: req.body.time || "",
      meetingLink: req.body.meetingLink || "",
      status: req.body.status,
      round: req.body.round,

      currentCTC: req.body.currentCTC || null,
      expectedCTC: req.body.expectedCTC || null,
      totalExperience: req.body.totalExperience || null,
      dateOfJoining: req.body.dateOfJoining || "",
      noticePeriod: req.body.noticePeriod || null,
      currentCompany: req.body.currentCompany || "",
    };

    console.log("Processed interview data:", interviewData);

    const newInterview = await Interview.create(interviewData);

    console.log("Interview created successfully:", newInterview);

    res.status(201).json({
      success: true,
      message: "Interview Added Successfully",
      data: newInterview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(400).json({
      success: false,
      message: "Error creating interview",
      error: error.message,
    });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Updating interview ${id} with data:`, req.body);

    const updateData = {
      candidate: req.body.candidate,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      date: req.body.date,
      time: req.body.time,
      meetingLink: req.body.meetingLink,
      status: req.body.status,
      round: req.body.round,
      currentCTC: req.body.currentCTC,
      expectedCTC: req.body.expectedCTC,
      totalExperience: req.body.totalExperience,
      dateOfJoining: req.body.dateOfJoining,
      noticePeriod: req.body.noticePeriod,
      currentCompany: req.body.currentCompany,
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    console.log("Processed update data:", updateData);

    const updatedInterview = await Interview.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInterview) {
      console.log("Interview not found with ID:", id);
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    console.log("Interview updated successfully:", updatedInterview);

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: updatedInterview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    res.status(400).json({
      success: false,
      message: "Error updating interview",
      error: error.message,
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }
    res.status(200).json({
      success: true,
      data: interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching interview",
      error: error.message,
    });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const deleted = await Interview.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting interview",
      error: error.message,
    });
  }
};

export const getInterviewsByFilter = async (req, res) => {
  try {
    const { status, round } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (round) filter.round = round;

    const interviews = await Interview.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching interviews",
      error: error.message,
    });
  }
};
