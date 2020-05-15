import express from "express";
import { getAvailablePilot } from "./crew/crewController";
import { postSchedule } from "./schedule/scheduleController";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/pilot", getAvailablePilot);
app.use("/schedule", postSchedule);

export default app;
