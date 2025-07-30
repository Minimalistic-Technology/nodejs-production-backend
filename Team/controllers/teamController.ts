import { Request, Response } from "express";
import Team from "../models/team";

export const createTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, imageUrl } = req.body;
    console.log("Creating team member:", { name, position, imageUrl });
    if (!imageUrl) res.status(400).json({ error: "Image URL required" });
    
    const newMember = new Team({
      name,
      position,
      imageUrl,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
};


// Get All
export const getAllTeamMembers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

// Get By ID
export const getTeamMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) res.status(404).json({ error: "Team member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: "Error fetching team member" });
  }
};

// Update
export const updateTeamMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) res.status(404).json({ error: "Team member not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update team member" });
  }
};

// Delete
export const deleteTeamMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) res.status(404).json({ error: "Team member not found" });
    res.json({ message: "Team member deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete team member" });
  }
};