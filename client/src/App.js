// import those pages in App.js
// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./components/TopNav";
import DashBoard from "./User/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import DashBoardSeller from "./User/DashBoardSelller";
import StripeCallback from './stripe/StripeCallback';
import PrivateRoute2 from "./components/PrivateRoute2";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <PrivateRoute exact path="/dashboard" element={<DashBoard />} /> */}

        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route exact path="/dashboard/seller" element={<DashBoardSeller />} />
        <Route exact path="/stripe/callback" element={<StripeCallback/>}/>
      </Routes>
      
    </>
  );
}

export default App;
