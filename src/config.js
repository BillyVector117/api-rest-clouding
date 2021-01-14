import { config } from "dotenv"; // Import only 'config' method
config(); // Run enviroment variables
export default {
  mongodbURL:
    process.env.MONGODB_URI || "mongodb://localhost/api-tasks-clouding", // Export enviroment variable easier
};
