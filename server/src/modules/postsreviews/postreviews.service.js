/* eslint-disable new-cap */

import postReviewModel from "./schema/reviews.schema.js";

async function addReview(data) {
    const { post, user, comment, rating, location } = data;

    if (!post || !user || !comment || !rating || !location) {
        return {
            status: false,
            message: "missing key",
        };
    }

    try {
        const review = new postReviewModel(data);
        const saveres = await review.save();
        if (!saveres) {
            return {
                status: false,
                message: "failed to add review",
            };
        }
        return {
            status: true,
            message: "review added",
            saveres,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

async function getAllReviews() {
    try {
        const reviews = await postReviewModel
            .find({})
            .populate({ path: "post", select: "_id name feature_image  " }, { path: "user", select: "_id name city" })
            .lean(true);
        if (!reviews) {
            return {
                status: false,
                message: "no reviews found",
            };
        }
        return {
            status: true,
            message: "reviews found",
            reviews,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

async function getReviewsByPost(id) {
    try {
        const reviews = await postReviewModel.find({ post: id }).populate(["post", "user", "location"]).lean(true);

        if (reviews.length <= 0) {
            return {
                status: false,
                message: "no reviews found",
            };
        }
        return {
            status: true,
            message: "review fetched",
            reviews,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}
async function getOneReviewById(id) {
    try {
        const reviews = await postReviewModel
            .findById(id)
            .populate([
                { path: "post", select: "_id name feature_image" },
                { path: "user", select: "_id name city" },
            ])
            .lean(true);
        if (!reviews) {
            return {
                status: false,
                message: "no reviews found",
            };
        }
        return {
            status: true,
            message: "review added",
            reviews,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

const postReviewService = {
    addReview,
    getReviewsByPost,
    getAllReviews,
    getOneReviewById,
};

export default postReviewService;
