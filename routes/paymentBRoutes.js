const express = require("express");
const router = express.Router();

const { isSignin, isAuthenticated } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/paymentb");
const { getUserById } = require("../controllers/user");

router.param("userId",getUserById);

router.get("/payment/gettoken/:userId", isSignin, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignin,
  isAuthenticated,
  processPayment
);

module.exports = router;
