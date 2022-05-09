import { Card, Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export default function ConnectNav() {
  const { Meta } = Card;
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{auth.user.name[0]}</Avatar>}
          title={auth.user.name}
          description={`Created at ${moment(auth.user.createdAt).from()}`}
        />
      </Card>
      {
        // auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled && 
        (<>
          <div>Pending Balance</div>
          <div>Payout settings</div>
        </>)
      }
    </div>
  );
}
