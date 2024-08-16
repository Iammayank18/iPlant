import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "./src/db/conn.js";
import morgan from "morgan";
import {
  POST_ROUTE_NAME,
  POST_REVIEW_ROUTE,
  USER_ROUTE_NAME,
} from "./src/utils/apiRoute.js";

import postRouter from "./src/modules/posts/posts.controller.js";
import userRouter from "./src/modules/user/user.controller.js";
import postReviewRouter from "./src/modules/postsreviews/postreviews.controller.js";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pubDir = path.join(__dirname, "./src/images");

app.use(express.static(pubDir));

const port = process.env.PORT || 5001;
app.use(morgan("tiny"));
app.use(express.json());
app.use(USER_ROUTE_NAME, userRouter);
app.use(POST_ROUTE_NAME, postRouter);
app.use(POST_REVIEW_ROUTE, postReviewRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`connection is setup at:  ${port}`);
});

export default app;
