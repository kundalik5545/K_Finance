import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    cardTitle: {
      type: String,
      required: true,
    },
    cardUrl: {
      type: String,
      required: true,
    },
    cardIcon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
