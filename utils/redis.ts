import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("Redis connection failed: REDIS_URL is not defined in .env");
}

export const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});


export const safeRedisGet = async (key: string): Promise<string | null> => {
  try {
    return await redis.get(key);
  } catch (err) {
    console.error("Redis GET error:", err);
    return null;
  }
};

export const safeRedisSet = async (key: string, value: any, ttlSeconds: number): Promise<void> => {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (err) {
    console.error("Redis SET error:", err);
  }
};

export const safeRedisDel = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (err) {
    console.error("Redis DEL error:", err);
  }
};
