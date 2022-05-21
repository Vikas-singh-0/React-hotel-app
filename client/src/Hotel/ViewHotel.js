import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { diffDays } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
export default function ViewHotel({ route }) {
  const [image, setimage] = useState("");
  const { hotelId } = useParams();
  const [hotel, setHotelData] = useState({});
  console.log("params", hotelId);
  const {auth} = useSelector((state)=>({...state}))

  const loadData = async () => {
    const image = `http://localhost:8000/api/hotel/image/${hotelId}`;

    const res = await axios({
      url: `http://localhost:8000/api/hotel/${hotelId}`,
    });
    // console.log("response ",image);
    setHotelData(res.data);
    setimage(image);
  };
  useEffect(() => {
    loadData();
  }, []);

  const history = useNavigate()
  const handleClick = async (e)=>{
    e.preventDefault()
    if(!auth){history('/login')}

    let res = await getSessionId(auth.token, hotelId);

  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              // disabled={loading || alreadyBooked}
            >
              {
              // loading
              //   ? "Loading..."
              //   : alreadyBooked
              //   ? "Already Booked"
                auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
