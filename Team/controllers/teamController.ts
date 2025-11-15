import { Request, Response } from "express";
import Team from "../models/team";
import NodeCache from "node-cache";
import { safeRedisGet, safeRedisSet, safeRedisDel } from "../../utils/redis";

const memoryCache = new NodeCache({ stdTTL: 60 });

const cacheKey = (id?: string) => (id ? `team:${id}` : "team:all");

export const createTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, imageUrl } = req.body;
    if (!imageUrl) {
      res.status(400).json({ error: "Image URL required" });
      return;
    }

    const newMember = new Team({ name, position, imageUrl });
    await newMember.save();

    memoryCache.del(cacheKey());
    await safeRedisDel(cacheKey());

    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
};

export const getAllTeamMembers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const key = cacheKey();

    const memData = memoryCache.get(key);
    if (memData) {
      res.json(memData);
    }

    const redisData = await safeRedisGet(key);
    if (redisData) {
      const parsed = JSON.parse(redisData);
      memoryCache.set(key, parsed);
      res.json(parsed);
    }

    const members = await Team.find();
    memoryCache.set(key, members);
    await safeRedisSet(key, members, 3600);

    res.json(members);
  } catch {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
};

export const getTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const key = cacheKey(req.params.id);

    const memData = memoryCache.get(key);
    if (memData) {
      res.json(memData);
    }

    const redisData = await safeRedisGet(key);
    if (redisData) {
      const parsed = JSON.parse(redisData);
      memoryCache.set(key, parsed);
      res.json(parsed);
    }

    const member = await Team.findById(req.params.id);
    if (!member) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }

    memoryCache.set(key, member);
    await safeRedisSet(key, member, 3600);

    res.json(member);
  } catch {
    res.status(500).json({ error: "Error fetching team member" });
  }
};

export const updateTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }

    const key = cacheKey(req.params.id);
    memoryCache.set(key, updated);
    await safeRedisSet(key, updated, 3600);

    memoryCache.del(cacheKey());
    await safeRedisDel(cacheKey());

    res.json(updated);
  } catch {
    res.status(400).json({ error: "Failed to update team member" });
  }
};

export const deleteTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }

    memoryCache.del(cacheKey(req.params.id));
    await safeRedisDel(cacheKey(req.params.id));
    memoryCache.del(cacheKey());
    await safeRedisDel(cacheKey());

    res.json({ message: "Team member deleted" });
  } catch {
    res.status(400).json({ error: "Failed to delete team member" });
  }
};
