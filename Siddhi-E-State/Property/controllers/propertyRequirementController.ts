import PropertyRequirement from '../models/PropertyRequirement';
import { Request, Response } from 'express';


export const createPropertyRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const requirement = await PropertyRequirement.create(req.body);
    res.status(201).json(requirement);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const getPropertyRequirements = async (_req: Request, res: Response): Promise<void> => {
  try {
    const requirements = await PropertyRequirement.find();
    res.json(requirements);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


export const getPropertyRequirementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const requirement = await PropertyRequirement.findById(req.params.id);
    if (!requirement)  res.status(404).json({ error: 'Requirement not found' });
    res.json(requirement);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};


export const updatePropertyRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await PropertyRequirement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)  res.status(404).json({ error: 'Requirement not found' });
    res.json(updated);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const deletePropertyRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await PropertyRequirement.findByIdAndDelete(req.params.id);
    if (!deleted)  res.status(404).json({ error: 'Requirement not found' });
    res.json({ message: 'Requirement deleted' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
