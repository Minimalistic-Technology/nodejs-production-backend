import { Request, Response } from 'express';
import Property from '../models/Property';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create property' });
  }
};

export const getProperties = async (_req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update property' });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete property' });
  }
};
