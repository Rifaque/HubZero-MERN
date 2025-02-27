const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MongoDB Connection with better error handling
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ DB CONNECTED"))
    .catch((err) => console.error("❌ DB CONNECTION ERROR:", err));

// Handle MongoDB Disconnection
mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB Disconnected. Attempting to Reconnect...");
    mongoose.connect(process.env.MONGO_URI);
});

app.use(express.json())
app.use(morgan("[:date[iso]] :method :url :status :response-time ms"));
app.use(cors({
    origin: ["https://hubzero.in", "http://localhost:3001","http://192.168.1.6"], // ✅ Allow both production & local dev
    credentials: true
}));

// API Routes
const testRoutes = require("./routes/test");
app.use("/api",testRoutes);

const teamRoutes = require("./routes/team");
app.use("/api/team", teamRoutes);

const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoutes);

const portfolioRoutes = require("./routes/portfolio");
app.use("/api/portfolio", portfolioRoutes);



// Start Server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

// Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err);
});

// Handle Unexpected Errors
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
});
