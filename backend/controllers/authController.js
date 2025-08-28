const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { varificationAuthMail, forpass } = require("../utils/sendEmail");

 


exports.registerUser = async (req, res) => {
  try {
    const { name, mobile,   email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists with email" });

    const existingUserd = await User.findOne({ mobile });
    if (existingUserd) return res.status(400).json({ message: "User already exists with mobile number" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user with isVerified=false
    const user = await User.create({ name,  email: email.toLowerCase(),mobile, password: hashedPassword });

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





























exports.forgotPassword = async (req, res) => {
  try {
    const { emailOrMobile } = req.body;

    const user = await User.findOne({
      $or: [
        { email: emailOrMobile.toLowerCase() },
        { mobile: emailOrMobile }
      ]
    });

    if (!user) return res.status(400).json({ message: "User not found!" });

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP + expiry in DB
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP via Email
    await forpass(user.email, otp);

    res.json({ message: "OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Step 2: Verify OTP & reset password
exports.resetPassword = async (req, res) => {
  try {
    const { emailOrMobile, otp, newPassword } = req.body;

    const user = await User.findOne({
      $or: [
        { email: emailOrMobile.toLowerCase() },
        { mobile: emailOrMobile }
      ]
    });

    if (!user) return res.status(400).json({ message: "User not found!" });

    if (user.resetOtp != otp || Date.now() > user.resetOtpExpire) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};














exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

const user = await User.findOne({
  $or: [
    { email: email.toLowerCase() },
    { mobile: email }
  ]
});
console.log(user)
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

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
