import React from "react";
import AlgoliaPlaces from "algolia-places-react";
import { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import axios from 'axios'
import { DatePicker, Space } from "antd";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'

const { RangePicker } = DatePicker;
const NewHotel = () => {
  const {auth} = useSelector((state)=>({...state}))
  const token = auth.token;

  console.log("the token is ****************",token);
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/150x150.png?text=Visit+WhoIsHostingThis.com+Buyers+Guide"
  );
  const [values, setValues] = useState({
    title: "",
    content: "",
    loaction: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const { title, content, price, image, to, from, bed } = values;
  const [location, setLocation] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title",title)
    formData.append("content",content)
    formData.append("price",price)
    formData.append("to",to)
    formData.append("from",from)
    
    image && formData.append("image",image)
    const res = await axios({
      method:'POST',
      url:'http://localhost:8000/api/new-hotel',
      data:formData,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    toast("new hote lc reateds")
    // console.log([...formData]);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const datePicker = () => (
    <Space direction="vertical" className="form-control m-2" size={12}>
      <RangePicker onChange={(date,checkate)=>{
        setValues({...values,to:checkate[1],from:checkate[0]})
      }} />
    </Space>
  );

  const hotelForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label className="btn btn-outline-secondary btn-block m-2 text-left">
            Image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label>

          <input
            type="text"
            value={title}
            name="title"
            onChange={handleChange}
            placeholder="title"
            className="form-control m-2"
          />

          <input
            type="textArea"
            value={content}
            name="content"
            onChange={handleChange}
            placeholder="content"
            className="form-control m-2"
          />
          <ReactGoogleAutocomplete
            className="form-control m-2"
            placeholder="Location"
            apiKey="AIzaSyDJVcDkcGUbaYY4G4GlcQjFZlcfxwGh2Ko"
            onPlaceSelected={(place) => {
              setLocation(place.formatted_address);
            }}
            style={{ height: "50px" }}
          />
          <input
            type="text"
            value={price}
            name="price"
            onChange={handleChange}
            placeholder="price"
            className="form-control m-2"
          />
                    {datePicker()}
          <input
            type="text"
            value={bed}
            name="bed"
            onChange={handleChange}
            placeholder="bed"
            className="form-control m-2"
          />

          <button className="btn btn-outline-secondary btn-block m-2">
            Save
          </button>
        </div>
      </form>
    );
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />

            {hotelForm()}
          </div>
          <div className="col-md-2">
            <img src={preview} className="img img-fluid" />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
