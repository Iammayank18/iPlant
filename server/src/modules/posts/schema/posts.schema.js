/* eslint-disable new-cap */
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    story: {
      type: String,
      default: null,
    },
    feature_image: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    gallery: [
      {
        type: String,
      },
    ],
    country: {
      type: String,
      default: null,
    },
    area: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    mission: {
      type: String,
      default: null,
    },
    vision: {
      type: String,
      default: null,
    },

    level: {
      type: String,
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const postModel = new mongoose.model("post", postSchema);
export default postModel;
