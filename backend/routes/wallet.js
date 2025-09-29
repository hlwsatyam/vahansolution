 

const express = require("express");
const router = express.Router();
const WalletTransaction = require("../models/WalletTransaction");
const User = require("../models/User");
// const fetch = require("node-fetch"); // Uncomment if needed
 
// ✅ Create an order for adding money 
router.post("/add-funds", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    // Validate input
    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid user ID or amount" });
    }

    // Get user details for customer information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const response = await fetch(CASHFREE_BASE_URL, {
      method: "POST",
      headers: {
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01", // Add API version
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_email: user.email || "user@test.com",
          customer_phone: user.phone || "9999999999",
        },
        order_note: "Wallet Topup",
        order_meta: {
          return_url: `${process.env.BACKEND_URL}/api/wallet/verify?order_id=${orderId}&user_id=${userId}`,
          // Use your actual frontend URL in production
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Cashfree API Error:", data);
      return res.status(response.status).json({ 
        message: "Failed to create Cashfree order", 
        error: data.message 
      });
    }

    // Save transaction
    await WalletTransaction.create({
      user: userId,
      amount,
      type: "CREDIT",
      status: "PENDING",
      orderId,
    });

    res.json(data);
  } catch (err) {
    console.error("Add funds error:", err);
    res.status(500).json({ 
      message: "Failed to create Cashfree order", 
      error: err.message 
    });
  }
});




router.get('/search', async (req, res) => {
  try {
    const { identifier } = req.query;
    
    if (!identifier) {
      return res.status(400).json({ error: 'Identifier parameter is required' });
    }
    
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { mobile: identifier },
        { name: { $regex: identifier, $options: 'i' } }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 // Update user wallet points and create transaction record
router.post('/update-wallet', async (req, res) => {
  try {
    const { userId, amount, reason } = req.body;
    
    if (!userId || !amount) {
      return res.status(400).json({ error: 'User ID and amount are required' });
    }
    
    const pointsToAdd = parseInt(amount);
    if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate a unique order ID
    const orderId = `WTX${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
    
    // Create wallet transaction record
    const walletTransaction = new WalletTransaction({
      user: userId,
      amount: pointsToAdd,
      type: "CREDIT",
      reason: reason || "Admin credit",
      status: "SUCCESS",
      orderId: orderId
    });
    
    await walletTransaction.save();
    
    // Update user wallet
    user.wallet_point += pointsToAdd;
    await user.save();
    
    // Populate user data for response
    const updatedUser = await User.findById(userId);
    
    res.json({ 
      message: `Successfully added ${pointsToAdd} points to wallet`,
      user: updatedUser,
      transaction: walletTransaction
    });
  } catch (error) {
    console.error('Update wallet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});










// ✅ Verify transaction after payment (webhook or return URL)
router.post("/verify", async (req, res) => {
  try {
    const { orderId } = req.query || req.body;
    
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Verify payment with Cashfree
    const verifyResponse = await fetch(`${CASHFREE_BASE_URL}/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
    });

    const paymentData = await verifyResponse.json();
    
    const transaction = await WalletTransaction.findOne({ orderId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update transaction status based on Cashfree response
    transaction.status = paymentData.order_status === "PAID" ? "SUCCESS" : "FAILED";
    await transaction.save();

    if (transaction.status === "SUCCESS") {
      await User.findByIdAndUpdate(transaction.user, {
        $inc: { wallet_point: transaction.amount },
      });
    }

    res.json({ 
      message: "Wallet updated successfully",
      status: transaction.status
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ 
      message: "Verification failed", 
      error: err.message 
    });
  }
});

// ✅ Get wallet balance
router.get("/balance/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ balance: user.wallet_point || 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching balance", error: err.message });
  }
});

// ✅ Get wallet history
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await WalletTransaction.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message });
  }
});

module.exports = router;