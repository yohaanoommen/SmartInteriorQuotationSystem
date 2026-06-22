import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import quotationRoutes from "./routes/quotationRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/quotations", quotationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Interior Quotation Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});