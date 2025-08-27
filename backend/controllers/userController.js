const User = require("../models/User"); // your schema

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: e.message || "Something went wrong" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name } = req.body;
    const update = {};
    if (name) update.name = name.trim();

    const user = await User.findByIdAndUpdate(
      req.userId,
      update,
      { new: true, runValidators: true, context: "query" }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: e.message || "Something went wrong" });
  }
};
