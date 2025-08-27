const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { varificationAuthMail } = require("../utils/sendEmail");

 


exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user with isVerified=false
    const user = await User.create({ name, email, password: hashedPassword });

    // Create verification token
    const verifyToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Direct backend API link (no frontend)
    const verifyLink = `${process.env.BACKEND_URL}/api/verify/${verifyToken}`;

    // Send Email
    await varificationAuthMail(
      user.email,
     user
     ,verifyLink
    );

    res.status(201).json({ message: "User registered. Check email to verify." });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};




 

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params;

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).send(getHtmlResponse("❌ Invalid token"));

    if (user.isVerified) {
      return res
        .status(400)
        .send(getHtmlResponse("⚠️ Your account is already verified"));
    }

    user.isVerified = true;
    await user.save();

    res.send(
      getHtmlResponse(
        "✅ Your account has been verified successfully 🎉 <br/> You can now close this tab and go back to the login page to continue."
      )
    );
  } catch (error) {
    res
      .status(400)
      .send(getHtmlResponse("⏳ Invalid or expired verification link"));
  }
};

// Helper function for stylish HTML response
function getHtmlResponse(message) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Account Verification</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          color: #fff;
        }
        .box {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 40px 30px;
          border-radius: 16px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0px 8px 25px rgba(0,0,0,0.3);
        }
        .box h2 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .box p {
          font-size: 16px;
          line-height: 1.5;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>🔐 Account Verification</h2>
        <p>${message}</p>
      </div>
    </body>
    </html>
  `;
}























exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// JWT generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
