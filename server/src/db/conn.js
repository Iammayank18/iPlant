import mongoose from "mongoose";

const { DBLOCAL, DBLIVE, DEV_ENV } = process.env;

mongoose
  .connect(`${DEV_ENV === "dev" ? DBLOCAL : DBLIVE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connedted to db");
  })
  .catch((e) => {
    throw new Error(e.message);
  });
