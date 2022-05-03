import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import login from "../actions/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      toast("loggedin successfully");
      // navigate("/login");
    } catch (error) {
      toast("error occured");
    }
  };

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
