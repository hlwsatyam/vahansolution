const express = require("express");
const { getRCDetails, getRCWithChallanDetails, getChallan, drivinglicense } = require("../controllers/rcController.js");

const router = express.Router();

router.get("/:rcNumber", getRCDetails);
router.get("/rcwithchallan/:rcNumber", getRCWithChallanDetails);
router.post("/driving-license", drivinglicense);
router.get("/echallan/:rcNumber/:chassis_number/:engine_number", getChallan);

module.exports = router; 