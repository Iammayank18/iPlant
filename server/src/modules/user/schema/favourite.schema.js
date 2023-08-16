"use strict";
import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchoolSchema = new Schema(
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

const FavoriteModel = mongoose.model("favouritePost", favoriteSchoolSchema);
export default FavoriteModel;
