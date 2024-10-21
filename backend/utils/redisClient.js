import dotenv from "dotenv";
dotenv.config(); 
import { Redis } from '@upstash/redis'

const redisClient = new Redis({
  url: "https://cunning-halibut-44067.upstash.io",
  token: "AawjAAIjcDEwYzM0MmFiMDdjZGQ0ZWY2OGU3YjRhODM0MjkzZTg5YnAxMA",
})(
  //Connect redis client to redis server
  async () => {
    await redisClient.connect();
  }
)();

//Redis connection check
redisClient.on("ready", () => {
  console.log("Connected to Redis Server!");
});

redisClient.on("error", (err) => {
  console.log("Error Connecting to Redis Server: ", err);
});

export default redisClient;
