// models/Knowledge.js
import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], // Change this line to make tags an array of strings
      required: true,
    },
  },
  { timestamps: true }
);

export const Knowledge = mongoose.model("Knowledge", knowledgeSchema);
