import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  beacons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beacon",
    },
  ]
});

const User = mongoose.model("User", userSchema);

export default User;
