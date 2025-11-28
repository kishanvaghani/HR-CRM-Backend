import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { connectDB } from "./config/db.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
console.log(process.env.CLIENT_URL, "------------------------1");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

connectDB(process.env.MONGO_URI);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       callback(null, origin); // reflect requested origin
//     },
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true,
//   })
// );
app.use(express.json());

app.get("/api/health", (req, res) => {
  console.log(process.env.CLIENT_URL, "------------------------2");
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/email", emailRoutes);

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
