import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const logoutHandler = (e)=>{

    
    dispatch({type:'LOGOUT',payload:null})
    window.localStorage.removeItem('auth',null);
    navigate('/login')
    
  }

  const { auth } = useSelector((state) => ({ ...state }));

  let logout = (
    <Link className="nav-link" to="/login" onClick={logoutHandler}>
    Logout
  </Link>
  )
  let logeedIN = (
    <>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
    </>
  );
  return (
    <div className="nav bg-dark d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {auth===null && logeedIN }
      {auth !== null && logout }
    </div>
  );
};

export default TopNav;
