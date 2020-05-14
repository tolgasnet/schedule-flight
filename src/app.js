import express from "express";
import { getSchedules } from "./schedule/scheduleController";

const app = express();

app.use("/schedules", getSchedules);

export default app;
