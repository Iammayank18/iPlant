import express from "express";
import postReviewService from "./postreviews.service.js";
import { COMMON_SERVICE } from "../../utils/common.helper.js";

const postReviewRouter = express.Router();

postReviewRouter.post("/add", async (req, res) => {
  const response = await postReviewService.addReview(req.body);

  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, response.message, false, 404);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      response.message,
      true,
      200,
      response,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, response.message, false, 500);
  }
});

postReviewRouter.get("/getallreviews", async (req, res) => {
  const response = await postReviewService.getAllReviews();
  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, response.message, false, 404);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      response.message,
      true,
      200,
      response,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, response.message, false, 500);
  }
});

postReviewRouter.get("/reviewbypost", async (req, res) => {
  const response = await postReviewService.getReviewsByPost(req.query.id);

  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, response.message, false, 404);
    }

    return COMMON_SERVICE.apiResponse(
      res,
      response.message,
      true,
      200,
      response,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, response.message, false, 500);
  }
});

postReviewRouter.get("/getonereview", async (req, res) => {
  const response = await postReviewService.getOneReviewById(req.query.id);
  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, response.message, false, 404);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      response.message,
      true,
      200,
      response,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, response.message, false, 500);
  }
});

export default postReviewRouter;
