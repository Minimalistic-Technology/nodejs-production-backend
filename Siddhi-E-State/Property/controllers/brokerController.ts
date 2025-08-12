import Broker from '../models/Broker';
import { Request, Response } from 'express';


export const createBroker = async (req: Request, res: Response): Promise<void> => {
  try {
    const broker = await Broker.create(req.body);
    res.status(201).json(broker);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const getBrokers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const brokers = await Broker.find();
    res.json(brokers);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getBrokerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findById(req.params.id);
    if (!broker)  res.status(404).json({ error: 'Broker not found' });
    res.json(broker);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const updateBroker = async (req: Request, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!broker)  res.status(404).json({ error: 'Broker not found' });
    res.json(broker);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};


export const deleteBroker = async (req: Request, res: Response): Promise<void> => {
  try {
    const broker = await Broker.findByIdAndDelete(req.params.id);
    if (!broker)  res.status(404).json({ error: 'Broker not found' });
    res.json({ message: 'Broker deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
