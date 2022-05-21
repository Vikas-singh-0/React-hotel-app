import axios from "axios";
export const createConnectAccount = async (token) => {
  await axios({
    url: "http://localhost:8000/create-connect-account",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSessionId = async (token, hotelId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    {
      hotelId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


export const getAccountStatus = async (token) => {
  const  data  = await axios({
    url: "http://localhost:8000/api/get-account-status",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in getstatus function DAATTAAAAAAAAA" ,data );
  
  return data;
};

export const getAccountBalance = async (token) => {
  return await axios({
    url: "http://localhost:8000/api/get-account-balance",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });
};
