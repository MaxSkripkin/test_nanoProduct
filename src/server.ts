import mongoose from "mongoose";
import app from "./index";
import { errorLogger } from "./utils/error";

const PORT = 3000;
const MONGODB_URI = "mongodb://localhost:3000/mydatabase";

const mongoOptions = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongoOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    errorLogger.error(err.message);
    process.exit(1);
  });
