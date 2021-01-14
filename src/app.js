import express from "express";
import taskRoutes from "./routes/Task.routes";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import methodOverride from "method-override";
// Server configuration
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.json()); // Read JSON format
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(bodyParser.json({ type: "application/json" }));
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome, go to: /api/tasks" });
});

app.use("/api/tasks", taskRoutes); // use Task.routes file using prefix

export default app;
