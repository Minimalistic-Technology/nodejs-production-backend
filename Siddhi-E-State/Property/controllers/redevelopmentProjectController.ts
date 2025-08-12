import { Request, Response } from "express";
import { RedevelopmentProjectModel } from "../models/RedevelopmentProject";


export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await RedevelopmentProjectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await RedevelopmentProjectModel.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};


export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProject = new RedevelopmentProjectModel(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: "Invalid project data" });
  }
};


export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await RedevelopmentProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};


export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await RedevelopmentProjectModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};