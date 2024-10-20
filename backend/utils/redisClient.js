import redis from "redis";
const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379",
}); //default port 6379

//Connect redis client to redis server
(async () => {
  await redisClient.connect();
})();

//Redis connection check
redisClient.on("ready", () => {
  console.log("Connected to Redis Server!");
});

redisClient.on("error", (err) => {
  console.log("Error Connecting to Redis Server: ", err);
});

export default redisClient;