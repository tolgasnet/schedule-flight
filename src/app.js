import express from "express";
import { getSchedules } from "./schedule/scheduleController";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/schedules", getSchedules);

export default app;
