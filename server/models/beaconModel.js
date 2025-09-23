import mongoose from "mongoose";

const beaconSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  url: { type: String, required: true },
  jobId: { type: Number, required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schedule: { type: Object, default: {} },
  lastStatus: { type: Number },
  lastDuration: { type: Number},
  lastExecution: { type: Number},
  nextExecution: { type: Number}
}, { timestamps: true });

const Beacon = mongoose.model("Beacon", beaconSchema);
export default Beacon;
