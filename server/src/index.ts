import express from "express";
import { createClient } from "redis";
import taskRoutes from "./routes/tasks";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("error", err => {
  console.error("Redis Client Error", err);
  process.exit(1);
});

redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");

    app.listen(PORT, () => {
      console.log(`Server running: ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to Redis", err);
    process.exit(1);
  });

export { redisClient };
