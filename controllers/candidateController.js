// import Candidate from "../models/Candidate.js";
// import asyncHandler from "../middleware/asyncHandler.js";

// export const createCandidate = asyncHandler(async (req, res) => {
//   const { name, email, phone, status, position, notes } = req.body;
//   if (!name) return res.status(400).json({ success: false, message: "Name is required" });

//   const candidate = await Candidate.create({ name, email, phone, status, position, notes });
//   res.status(201).json({ success: true, data: candidate });
// });

// export const getCandidates = asyncHandler(async (req, res) => {
//   const { q, status } = req.query;
//   const filter = {};
//   if (status) filter.status = status;
//   if (q) {
//     const re = new RegExp(q, "i");
//     filter.$or = [{ name: re }, { email: re }, { phone: re }, { position: re }];
//   }
//   const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
//   res.json({ success: true, data: candidates });
// });

// export const getCandidateById = asyncHandler(async (req, res) => {
//   const candidate = await Candidate.findById(req.params.id);
//   if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found" });
//   res.json({ success: true, data: candidate });
// });

// export const updateCandidate = asyncHandler(async (req, res) => {
//   const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found" });
//   res.json({ success: true, data: candidate });
// });

// export const deleteCandidate = asyncHandler(async (req, res) => {
//   const candidate = await Candidate.findByIdAndDelete(req.params.id);
//   if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found" });
//   res.json({ success: true, message: "Candidate deleted" });
// });


import Candidate from "../models/Candidate.js";

// GET All Candidates
export const getCandidates = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }
    
    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching candidates",
      error: error.message
    });
  }
};

// CREATE Candidate
export const createCandidate = async (req, res) => {
  try {
    const newCandidate = await Candidate.create(req.body);
    res.status(201).json({
      success: true,
      message: "Candidate Added Successfully",
      data: newCandidate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating candidate",
      error: error.message
    });
  }
};

// GET Single Candidate
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ 
        success: false,
        message: "Candidate not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: candidate 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching candidate",
      error: error.message
    });
  }
};

// UPDATE Candidate
export const updateCandidate = async (req, res) => {
  try {
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: updated 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating candidate",
      error: error.message
    });
  }
};

// DELETE Candidate
export const deleteCandidate = async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Candidate deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting candidate",
      error: error.message
    });
  }
};