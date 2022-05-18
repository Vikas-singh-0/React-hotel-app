import fs from "fs";
import Hotel from "../modals/hotel";

export const newHotel = async (req, res) => {
  //   console.log("req.fields", req.fields);
  //   console.log("req.files", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    console.log(req.auth);
    hotel.postedBy = req.auth._id;
    // handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};


export const image = async (req, res) => {
  console.log(req.params.id);
  let hotel = await Hotel.findById(req.params.id);
  console.log(hotel);
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const hotels = async (req, res) => {
  // let all = await Hotel.find({ from: { $gte: new Date() } })
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  // console.log(all);
  res.json(all);
};

export const sellerHotels = async(req,res)=>{
  let all = await Hotel.find({postedBy:req.auth._id})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  return res.json(all);
}