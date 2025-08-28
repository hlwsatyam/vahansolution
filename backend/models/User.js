const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,  
      trim: true 
    },
    mobile: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,  
      trim: true  
    },

        // Password reset fields
    resetOtp: { type: String }, // store the OTP (optional: hash for security)
    resetOtpExpire: { type: Date }, // expiration timestamp


    password: { 
      type: String, 
      required: true,
      minlength: 6 
    },
    wallet_point:{
      type:Number,
      default:0
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    }  // Email/Phone verification flag
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
