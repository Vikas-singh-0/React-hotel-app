import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import NewHotel from "../Hotel/NewHotel";
import CardR from "./CardR";
import SmallCard from "./SmallCard";
import Test from "./Test";
const Home = () => {
  const [allHotels,setAllHotels] = useState([])
  const res = useEffect(() => {
    
    loadHotels()

  }, [])

  const loadHotels = async()=>{
    const allHotels = await axios({
      url:`http://localhost:8000/api/hotels`
    })
    // console.log(allHotels.data);
    setAllHotels(allHotels.data)
  }
  
  const store = useSelector((store) => ({ ...store }));
  // console.log("store", store);
  return (
    <>
      <div className="container-fluid h1 p-5 text-center">Home Page</div>;
      
        {/* {JSON.stringify(allHotels,null,4)} */}
        {
          allHotels.map((hotel)=>{
            return <SmallCard key={hotel._id} h={hotel}/>
          })
        }
      
    </>
  );
};

export default Home;
