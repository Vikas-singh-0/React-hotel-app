import { Spin } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountStatus,getAccountBalance } from "../actions/stripe";
import {updateUserINLocalStorage} from '../actions/auth'

export default function StripeCallback() {
  const auth = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

 

  useEffect(() => {
    if (auth.auth && auth.auth.token) {
      getAccountStatusfun();
    }
  }, [auth]);
  const getAccountStatusfun = async () => {
    try {
      const res = await getAccountStatus(auth.auth.token);
      console.log("repsonse form auth dataaaaaaaaaaaaaa", res.data.user);
      updateUserINLocalStorage(res,()=>{
        dispatch({type:"LOG_IN_USER",payload:res})
      })
      window.location.href='/'
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex justify-content-center p-5">
      <Spin size="large" className="display-1 p-5 text-designer" />
     
    </div>
  );
}
