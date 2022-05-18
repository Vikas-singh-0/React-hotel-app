import React, { useState,useRef, useEffect } from 'react';


const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    initPlaceAPI();
  }, []);

  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  };

  return (
    <>
      <input type="text" ref={placeInputRef} />
      {place && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
        <div><b>Address:</b> {place.address}</div>
        <div><b>Lat:</b> {place.lat}</div>
        <div><b>Lng:</b> {place.lng}</div>
      </div>}
    </>
  );
};




// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyDJVcDkcGUbaYY4G4GlcQjFZlcfxwGh2Ko';

// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}

const Gapp = () => {
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);

  return (
    <div className="App">
      <a href="https://www.cluemediator.com">Clue Mediator</a><br /><br />
      {!loadMap ? <div>Loading...</div> : <GPlace />}
    </div>
  );
}

export default Gapp;