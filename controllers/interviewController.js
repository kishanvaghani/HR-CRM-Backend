
import Interview from "../models/Interview.js";
import { sendInterviewEmail, testTransporter } from "../utils/emailService.js";

export const createInterview = async (req, res) => {
  try {
    console.log("=== CREATE INTERVIEW ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    // First, test if email service is working
    console.log("Testing email transporter...");
    const emailServiceReady = await testTransporter();
    console.log("Email service ready:", emailServiceReady);

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

    console.log("Saving interview to database...");
    const newInterview = await Interview.create(interviewData);
    console.log("✅ Interview saved:", newInterview._id);

    // Auto-send email for 1st and 2nd rounds
    if (['1st Round', '2nd Round'].includes(req.body.round)) {
      console.log(`🔄 Attempting to send ${req.body.round} email...`);
      
      try {
        await sendInterviewEmail(
          newInterview.email,
          newInterview.candidate,
          newInterview.position,
          newInterview.date,
          newInterview.time,
          newInterview.meetingLink,
          req.body.round
        );
        
        // Update interview with email sent status
        newInterview.emailSent = true;
        newInterview.lastEmailRound = req.body.round;
        await newInterview.save();
        
        console.log(`✅ Auto-email sent successfully for ${req.body.round}`);
        
      } catch (emailError) {
        console.error(`❌ Failed to send auto-email for ${req.body.round}:`, emailError);
        // Continue with the response even if email fails
        console.log("⚠️ Continuing without email...");
      }
    } else {
      console.log(`ℹ️ No email required for round: ${req.body.round}`);
    }

    res.status(201).json({
      success: true,
      message: "Interview Added Successfully",
      data: newInterview,
      emailSent: newInterview.emailSent || false
    });

  } catch (error) {
    console.error("❌ Error creating interview:", error);
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
    console.log(`=== UPDATE INTERVIEW ${id} ===`);
    console.log("Update data:", JSON.stringify(req.body, null, 2));

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

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    console.log("Finding existing interview...");
    const oldInterview = await Interview.findById(id);
    if (!oldInterview) {
      console.log("❌ Interview not found");
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    console.log("Updating interview...");
    const updatedInterview = await Interview.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log("✅ Interview updated successfully");

    // Auto-send email when round changes to 1st or 2nd round
    const roundChanged = oldInterview.round !== req.body.round;
    if (roundChanged && ['1st Round', '2nd Round'].includes(req.body.round)) {
      console.log(`🔄 Round changed to ${req.body.round}, sending email...`);
      
      try {
        await sendInterviewEmail(
          updatedInterview.email,
          updatedInterview.candidate,
          updatedInterview.position,
          updatedInterview.date,
          updatedInterview.time,
          updatedInterview.meetingLink,
          req.body.round
        );
        
        // Update interview with email sent status
        updatedInterview.emailSent = true;
        updatedInterview.lastEmailRound = req.body.round;
        await updatedInterview.save();
        
        console.log(`✅ Update email sent successfully for ${req.body.round}`);
        
      } catch (emailError) {
        console.error(`❌ Failed to send update email:`, emailError);
        // Continue even if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: updatedInterview,
    });

  } catch (error) {
    console.error("❌ Error updating interview:", error);
    res.status(400).json({
      success: false,
      message: "Error updating interview",
      error: error.message,
    });
  }
};

