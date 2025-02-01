import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export const connect = async () => {
    await mongoose.connect(DB_URL);
}