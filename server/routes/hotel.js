import express from "express";
import { newHotel,hotels,image,sellerHotels } from "../controllers/hotel";
import formidable from "express-formidable";
import { requiresLogin } from "../middleware";
import { expressjwt } from "express-jwt";

const router = express.Router();

// controllers

router.post("/new-hotel", expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), formidable() , newHotel);
router.get("/hotels", hotels);
router.get('/hotel/image/:id',image)
router.get('/seller-hotels', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),sellerHotels)


module.exports = router;
