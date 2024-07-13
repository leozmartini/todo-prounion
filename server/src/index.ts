import express from "express";
import { createClient } from "redis";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

export { redisClient };
