import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import { getAccountStatus,getAccountBalance } from "../actions/stripe";
import { useSelector } from "react-redux";
import axios from "axios";
import { userHotels } from "../actions/hotel";


export default function DashBoard(props) {
  const auth = useSelector((state) => ({ ...state }));
  const [getHotelsBooked,sethotelSBooked ]= useState([])

  const fetchHotels =async ()=>{
    const {data} = await userHotels(auth.token);
    // console.log(data);
    sethotelSBooked(data)
  }

  // useEffect(async () => {
    // const res = await fetchHotels()
  // }, [fetchHotels])
  


  const getBalance = async () => {
    const res = await getAccountBalance(auth.auth.token);
    // console.log(res);
  };
  // console.log(props);
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid">
        <DashboardNav />
      </div>
      <button onClick={getBalance}>Click</button>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Bookings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
