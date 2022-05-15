import express from "express";
import { expressjwt } from "express-jwt";

const router = express.Router();

// controllers
import { createConnectAccount,getAccountStatus,getAccountBalance } from "../controllers/stripe";
import { requiresLogin } from "../middleware";

router.post(
  "/create-connect-account",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  createConnectAccount
);
router.post(
  "/get-account-status",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  getAccountStatus
);

router.post(
  "/get-account-balance",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  getAccountBalance
);

module.exports = router;
