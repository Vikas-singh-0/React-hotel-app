import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import {login} from "../actions/auth";
import  axios  from "axios";
import {useDispatch,useSelector} from 'react-redux'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios({
        url: "http://localhost:8000/api/login",
        method: "POST",
        data:{email,password}
      });
      console.log("login data",data);
      window.localStorage.setItem('auth',JSON.stringify(data))
      dispatch({type:'LOG_IN_USER',payload:data})
      toast("loggedin successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("error occured",error);
    }
  };



  const store = useSelector((store=>({...store})))
  console.log("store",store);
 


  return (
    <>
      <ToastContainer />
      <div className="container-fluid h1 p-5 text-center">
        <h1>Login</h1>
      </div>
      <div className="container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button disabled={!email||!password} variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
