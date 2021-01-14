import mongoose from "mongoose";
import config from "./config"; // process.env

// Using Async/Await (Auto-executer function)
(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();

// Using Promises
/* const db = mongoose
  .connect("mongodb://localhost/api-rest-clouding", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected to:", mongoose.connection.name)); */
