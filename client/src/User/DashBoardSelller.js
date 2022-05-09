import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import { HomeOutlined } from "@ant-design/icons";
import axios from 'axios'
import {toast} from 'react-toastify'
export default function DashBoardSeller() {
  const [loading, setLoading] = useState(false);
  const {auth} = useSelector((store=>({...store})))
  const connected = ()=>(
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
    </div>
  );
  const notConnected1=()=>(<div className="container">
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
</div>)


const handleClick = async () => {
  setLoading(true);
  try {
    let res = await axios.post(`${process.env.REACT_APP_API}/create-connect-account`,{},{
      headers:{
        Authorization: `Bearer ${auth.token}`,
      }
    })
    console.log(res); // get login link
  } catch (err) {
    console.log(err);
    toast.error("Stripe connect failed, Try again.");
    setLoading(false);
  }
};


const notConnected = () => (
  <div className="container-fluid">
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
      {
        auth && auth.user &&auth.user.stripe_seller ? connected() : notConnected()
      }
    </>
  );
}
