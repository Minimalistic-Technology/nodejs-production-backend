import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/Profile';

// Create Profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = new Profile(req.body as IProfile);
    await profile.save();
    res.status(201).json(profile);
  } catch (err: any) {
    console.error('Create Error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get Profile by Email
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;
    if (typeof email !== 'string') {
      res.status(400).json({ error: 'Invalid email query parameter' });
      return;
    }

    const profile = await Profile.findOne({ email }, 'firstName lastName email');
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (err) {
    console.error('Get Error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    if (password && password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match' });
      return;
    }

    const profile = await Profile.findOneAndUpdate(
      { email },
      { firstName, lastName, password },
      { new: true }
    );

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (err: any) {
    console.error('Update Error:', err);
    res.status(400).json({ error: err.message });
  }
};
