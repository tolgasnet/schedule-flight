import express from "express";
import { getAvailablePilot } from "./crew/crewController";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/pilot", getAvailablePilot);

export default app;
