import mongoose from "mongoose";

const { Schema } = mongoose;

const favoritePostsSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
  },
  {
    timestamps: true,
  },
);

const FavoriteModel = mongoose.model("favouritePost", favoritePostsSchema);
export default FavoriteModel;
