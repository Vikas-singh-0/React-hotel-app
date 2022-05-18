import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { sellerHotels } from "../actions/hotel";
import SmallCard from '../booking/SmallCard';

export default function DashBoardSeller() {
  // console.log("authhhh((((((((((((",auth);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((store) => ({ ...store }));
  const [hotels,setHotels] = useState([])
  useEffect(() => {
    
    LoadsellerHotels()
  }, [])
  
  const LoadsellerHotels =async ()=>{
    const {data} = await sellerHotels(auth.token);
    // console.log(data);
    setHotels(data)
  }

  const connected = () => (
    <div className="container">
      <DashboardNav />
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Add New Hotel</h2>
          </div>
          <div className="col-md-2">
            <Link to="/hotel/new" className="btn btn-primary">
              + Add New
            </Link>
          </div>
        </div>
      </div>
      {/* <pre>
        {JSON.stringify(hotels,null,4)}
      </pre> */}
      {hotels.map(h=><SmallCard h={h} key={h._id} showViewMoreButton={false} owner={true}/>)}
    </div>
  );
  const notConnected1 = () => (
    <div className="container">
      <DashboardNav />
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h2>Non connected user</h2>
          </div>
          <div className="col-md-2">
            <Link to="/hotel/new" className="btn btn-primary">
              + Add New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_API}/create-connect-account`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const notConnected = () => (
    <div className="container-fluid">
      <DashboardNav />
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
}
