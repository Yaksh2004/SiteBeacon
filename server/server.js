import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const ENDPOINT = "https://api.cron-job.org";

const headers = {
  Authorization: `Bearer ${process.env.CRON_JOB_API_KEY}`,
  "Content-Type": "application/json",
};

const payload = {
  job: {
    enabled: true,
  },
};
async function updateJob() {
  try {
    const response = await axios.get(
      ENDPOINT + "/jobs",
      { headers } // headers go in a separate config object
    );
    console.log(response.data); // axios already parses JSON
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error.response?.data || error.message);
  }
}

app.get("/", async (req, res) => {
  const finalData = await updateJob();
  res.send(finalData);
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
