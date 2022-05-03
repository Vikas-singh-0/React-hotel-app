// import those pages in App.js
// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./components/TopNav";


function App() {
  return (
    <>
    <TopNav/>
    <Routes>

      <Route exact path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
