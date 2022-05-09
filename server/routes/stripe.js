import express from "express";
import { expressjwt } from "express-jwt";

const router = express.Router();

// controllers
import { createConnectAccount } from "../controllers/stripe";
import { requiresLogin } from "../middleware";

router.post(
  "/create-connect-account",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (req,res)=>{
          console.log(req.auth)
  }
);

module.exports = router;
