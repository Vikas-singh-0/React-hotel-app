import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import register from "../actions/auth";
const Register = (props) => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({name,email,password})
      toast("loggedin successfully")
      navigate('/login')
    } catch (error) {
      toast("error occured")
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid h1 p-5 text-center">
        <h1>Register</h1>
      </div>
      <div className="container">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </Form.Group>
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

          <Button variant="primary" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
