import express from "express";
import { newHotel,hotels,image,sellerHotels,getHotel, userHotels,editHotel,bookHotel } from "../controllers/hotel";
import formidable from "express-formidable";
import { requiresLogin } from "../middleware";
import { expressjwt } from "express-jwt";

const router = express.Router();

// controllers

router.post("/new-hotel", expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), formidable() , newHotel);
router.get("/hotels", hotels);
router.get('/hotel/image/:id',image)
router.get('/seller-hotels', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),sellerHotels)
router.get('/user-hotels', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),userHotels)
router.get('/hotel/:id',getHotel)
router.put('/hotel/edit/:id',editHotel)
router.post('/book-hotel/:hotelId',expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),bookHotel)

module.exports = router;
