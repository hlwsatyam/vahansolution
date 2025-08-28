const mongoose = require("mongoose");

const drivingLicenseSchema = new mongoose.Schema({
  driving_license_number: {
    type: String,
    required: true,
    index: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 24 * 60 * 60 
  }
});

// Compound index for efficient querying
drivingLicenseSchema.index({ 
  driving_license_number: 1, 
  date_of_birth: 1 
});

module.exports = mongoose.model("DrivingLicense", drivingLicenseSchema);