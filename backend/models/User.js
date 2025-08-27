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
