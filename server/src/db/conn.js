import mongoose from "mongoose";

const { DBLOCAL, DBLIVE, DEV_ENV } = process.env;

console.log("Database urls : ", DEV_ENV === "dev" ? DBLOCAL : DBLIVE);
mongoose
    .connect(`${DEV_ENV === "dev" ? DBLOCAL : DBLIVE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((e) => {
        console.log("Unable to connect to db", e.message);
    });
