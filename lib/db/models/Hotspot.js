import mongoose from "mongoose";

// Define schema only if it doesn't exist already
const HotspotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the hotspot"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please specify a category"],
      enum: ["food", "parks", "nightlife", "shopping", "culture", "activities"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: String,
      default: "Anonymous",
    },
    reviews: [
      {
        user: String,
        text: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Hotspot ||
  mongoose.model("Hotspot", HotspotSchema);
