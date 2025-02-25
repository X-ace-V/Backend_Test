import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "./serverConfig.js";

const redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT
});

export default redis;