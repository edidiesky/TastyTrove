import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Create a new Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL, // Upstash REST URL
  token: process.env.UPSTASH_REDIS_REST_TOKEN, // Upstash token
});

export default redis;
