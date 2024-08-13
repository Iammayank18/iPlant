import mongoose from "mongoose";

const { Schema } = mongoose;

const postReviewSchema = new Schema(
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
        rating: {
            type: Number,
            default: null,
        },
        comment: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const postReviewModel = mongoose.model("review", postReviewSchema);
export default postReviewModel;
