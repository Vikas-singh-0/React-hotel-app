import React from "react";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";

export default function DashBoard(props) {
  // console.log(props);
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        
          <ConnectNav />
        
      </div>
      <div className="container">
        <DashboardNav />
        
      </div>
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
