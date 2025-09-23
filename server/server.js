import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import { authUser } from "./middlewares/authUser.js";
import Beacon from "./models/beaconModel.js";
import User from "./models/userModel.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

const ENDPOINT = process.env.CRON_JOB_ENDPOINT;
const API_KEY = process.env.CRON_JOB_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};


app.get("/jobs", authUser, async (req, res) => {
  try {
    const userId = req.user._id; 
    const beacons = await Beacon.find({ user: userId });
    res.json({ beacons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user beacons" });
  }
});

app.get("/jobs/:id", authUser, async (req, res) => {
  try {
    const userId = req.user._id; 
    const beacon = await Beacon.findOne({ _id: req.params.id, user: userId });

    if (!beacon) {
      return res.status(404).json({ error: "Beacon not found" });
    }

    res.json(beacon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch beacon details" });
  }
});

app.post("/jobs", authUser, async (req, res) => {
  try {
    const userId = req.user._id; // assuming your authUser sets req.user

    // 1. Send request to Cron Job API
    const response = await axios.put(`${ENDPOINT}/jobs`, req.body, { headers });
    const jobData = response.data;

    // 2. Create Beacon document in MongoDB
    const beacon = await Beacon.create({
      title: req.body.job.title,
      url: req.body.job.url,
      jobId: jobData.jobId,
      schedule: req.body.job.schedule,
      user: userId,
    });

    const updatedData = await axios.get(`${ENDPOINT}/jobs/${jobData.jobId}`, {
      headers,
    });
    console.log(updatedData.data.jobDetails);

    beacon.lastStatus = updatedData.data.jobDetails.lastStatus;
    beacon.lastDuration = updatedData.data.jobDetails.lastDuration;
    beacon.lastExecution = updatedData.data.jobDetails.lastExecution;
    beacon.nextExecution = updatedData.data.jobDetails.nextExecution;

    await beacon.save();

    // 3. Push beacon ID to user
    await User.findByIdAndUpdate(userId, { $push: { beacons: beacon._id } });

    res.json(beacon);
  } catch (error) {
    console.error(error.response?.data || error);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to create job" });
  }
});


app.delete("/jobs/:id", authUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const beaconId = req.params.id;
    const beacon = await Beacon.findOne({ _id: beaconId, user: userId });
    if (!beacon) {
      return res.status(404).json({ error: "Beacon not found" });
    }

    // deleting cron job
    await axios.delete(`${ENDPOINT}/jobs/${beacon.jobId}`, { headers });
    await Beacon.findByIdAndDelete(beaconId);
    await User.findByIdAndUpdate(userId, { $pull: { beacons: beaconId } });
    res.json({ message: "Beacon deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error.response?.data || error);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to delete job" });
  }
});

// GET /jobs/refresh
app.get("/jobsRefresh", authUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const beacons = await Beacon.find({ user: userId });

    const updatedBeacons = await Promise.all(
      beacons.map(async (beacon) => {
        const response = await axios.get(`${ENDPOINT}/jobs/${beacon.jobId}`, {
          headers,
        });
        const jobDetails = response.data.jobDetails;

        beacon.lastStatus = jobDetails.lastStatus;
        beacon.lastDuration = jobDetails.lastDuration;
        beacon.lastExecution = jobDetails.lastExecution;
        beacon.nextExecution = jobDetails.nextExecution;

        await beacon.save();
        return beacon;
      })
    );

    res.json({ beacons: updatedBeacons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to refresh beacons" });
  }
});




async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
startServer();