 import { Request, Response } from "express";
import { CommercialProject } from "../models/CommercialProject";

export const getAllCommercial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const projects = await CommercialProject.find();
  res.status(200).json(projects);
};

export const getCommercialById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const project = await CommercialProject.findById(id);
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(200).json(project);
};

export const createCommercial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, image, location, type, completion } = req.body;
  const newProject = new CommercialProject({
    name,
    image,
    location,
    type,
    completion,
  });
  await newProject.save();
  res.status(201).json(newProject);
};

export const updateCommercial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updated = await CommercialProject.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(200).json(updated);
};

export const deleteCommercial = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const deleted = await CommercialProject.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(200).json({ message: "Deleted successfully" });
};