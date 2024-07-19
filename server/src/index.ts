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

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Falha ao conectar com banco de dados, tentando novamente...", err);
    setTimeout(connectToRedis, 5000);
  }
};

redisClient.on("error", err => {
  console.error("Redis Client Error", err);
});

connectToRedis();

export { redisClient };
