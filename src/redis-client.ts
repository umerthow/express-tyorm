import { createClient } from "redis"
import "dotenv/config";

export const client = createClient({
  password: "",
  socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10)
  }
});