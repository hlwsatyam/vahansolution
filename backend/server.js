const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/db");


const app = express();

// DB connect
connectDB(); 

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/authRoutes.js"));
app.use("/api/rc", require("./routes/rc.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
