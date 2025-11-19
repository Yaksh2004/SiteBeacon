import cron from "node-cron";
import Beacon from "../models/beaconModel.js";
import { checkWebsite } from "../utils/checkWebsite.js";

export function startScheduler(io) {
  cron.schedule("*/5 * * * * *", async () => {
    const beacons = await Beacon.find();

    for (const beacon of beacons) {
      const result = await checkWebsite(beacon.url);

      beacon.lastStatus = result.status;
      beacon.lastDuration = result.duration;
      beacon.lastExecution = new Date();
      beacon.nextExecution = new Date(Date.now() + 5000);

      await beacon.save();

      io.to(beacon.user.toString()).emit("beaconUpdate", beacon);
    }
  });

  console.log("Internal scheduler started.");
}
