import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const ENDPOINT = "https://api.cron-job.org";
const API_KEY = process.env.CRON_JOB_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ---------- 1. List all jobs ----------
app.get("/jobs", async (req, res) => {
  try {
    const response = await axios.get(`${ENDPOINT}/jobs`, { headers });
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to fetch jobs" });
  }
});

// ---------- 2. Get details of a specific job ----------
app.get("/jobs/:id", async (req, res) => {
  try {
    const response = await axios.get(`${ENDPOINT}/jobs/${req.params.id}`, {
      headers,
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to fetch job details" });
  }
});

// ---------- 3. Create a new job ----------
app.post("/jobs", async (req, res) => {
  try {
    const response = await axios.put(`${ENDPOINT}/jobs`, req.body, { headers });
    res.json(response.data); // returns jobId
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to create job" });
  }
});

// ---------- 4. Update a job ----------
app.patch("/jobs/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${ENDPOINT}/jobs/${req.params.id}`,
      req.body,
      { headers }
    );
    res.json(response.data); // {}
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to update job" });
  }
});

// ---------- 5. Delete a job ----------
app.delete("/jobs/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${ENDPOINT}/jobs/${req.params.id}`, {
      headers,
    });
    res.json(response.data); // {}
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to delete job" });
  }
});

// ---------- 6. Get execution history ----------
app.get("/jobs/:id/history", async (req, res) => {
  try {
    const response = await axios.get(
      `${ENDPOINT}/jobs/${req.params.id}/history`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to fetch job history" });
  }
});

// ---------- 7. Get history item details ----------
app.get("/jobs/:id/history/:identifier", async (req, res) => {
  try {
    const response = await axios.get(
      `${ENDPOINT}/jobs/${req.params.id}/history/${req.params.identifier}`,
      { headers }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to fetch history details" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
