import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModifify: true,
    // useCreateIndex: true,
  })
  .then((db) => console.info("Db is connected"))
  .catch((err) => console.error(err));
