import mongoose from "mongoose";

const { Schema } = mongoose;

const PostLocationSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [Number],
    },
    city: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },
    postcode: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

PostLocationSchema.index({ location: "2dsphere" });
const PostLocationModel = mongoose.model("location", PostLocationSchema);
export default PostLocationModel;
