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
app.use("/api/wallet", require("./routes/wallet.js"));


  

 app.get("/proxy/netc-fastag", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.npci.org.in/what-we-do/netc-fastag/check-your-netc-fastag-status"
    );

    // Get the HTML text
    let html = await response.text();

    // Optional: fix relative paths (e.g., /assets/style.css -> https://www.npci.org.in/assets/style.css)
    html = html.replace(/(src|href)=["']\/([^"']*)["']/g, '$1="https://www.npci.org.in/$2"');

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load page");
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
