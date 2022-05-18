import axios from'axios'
export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerHotels = async (token) => {
  const  data  = await axios({
    url: "http://localhost:8000/api/seller-hotels",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("in getstatus function DAATTAAAAAAAAA" ,data );
  
  return data;
};