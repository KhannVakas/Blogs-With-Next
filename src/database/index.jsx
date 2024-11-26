import mongoose from "mongoose";
const connectToDB = async () => {
  const url =
    "mongodb+srv://wa254549:serverActions@cluster0.p6vcx.mongodb.net/";

  mongoose
    .connect(url)
    .then(() => console.log("Database connection is established"))
    .catch((e) => console.log(e));
};

export default connectToDB;
