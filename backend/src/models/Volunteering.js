import mongoose from "mongoose";

const volunteeringSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true },
);

volunteeringSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Volunteering = mongoose.model("Volunteering", volunteeringSchema);

export default Volunteering;
