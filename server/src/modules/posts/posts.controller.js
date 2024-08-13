import express from "express";
import multer from "multer";
import postsService from "./posts.service.js";
import { COMMON_SERVICE } from "../../utils/common.helper.js";

const postRouter = express.Router();
const upload = multer();
postRouter.post("/addpost", upload.single("image"), postsService.createPost);

// get one post by id
postRouter.get("/byid", async (req, res) => {
  const postbyid = await postsService.getOnePostById(req.query);

  try {
    if (!postbyid.status) {
      return COMMON_SERVICE.apiResponse(res, "not found", false, 404);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, postbyid);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
});

// search
postRouter.get("/search", async (req, res) => {
  const response = await postsService.searchPost(req.query);

  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, "not found", false, 404);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, response);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
});

// get for home page
postRouter.get("/homepage", async (req, res) => {
  const response = await postsService.GetPostForHomePage(req.query);

  try {
    if (!response.status) {
      return COMMON_SERVICE.apiResponse(res, "not found", false, 404);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, response);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
});

//  get all post

postRouter.get("/byquery", async (req, res) => {
  const posts = await postsService.getPostsByRouteQuery(req.query);
  try {
    if (posts.status === false) {
      return COMMON_SERVICE.apiResponse(res, "not found", false, 500);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, posts);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
});

//  get all post

postRouter.get("/getallpost", async (req, res) => {
  const posts = await postsService.getAllPost();
  try {
    if (posts.status === false) {
      return COMMON_SERVICE.apiResponse(res, "not found", false, 500);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, posts);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
});

// delete all posts
postRouter.get("/deleteall", postsService.deleteAllPost);

export default postRouter;
