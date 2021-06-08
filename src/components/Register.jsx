import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register(props) {
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //Handle Input Changes
  const onchange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //Register User
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3004/register", userData)
      .then((r) => {
        localStorage.setItem("token", r.data.jwt);
        toast.success(`${r.data.msg}`);
      })
      .then(() => {
        props.history.push("/app");
      })
      .catch((e) => {
        toast.error(`Already Registered`);
      });
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.7)",
    padding: "50px 30px 50px 30px",
    borderRadius: "20px",
    color: "white",
  };

  return (
    <div className="row">
      <div className="col-12 mt-5">
        <center>
          <h3>User Registration</h3>
        </center>
      </div>
      <div className="col-3"></div>
      <form className="container mt-5 mb-5 col-6" style={formStyle}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="username" className="col-5">
                  Username
                </label>
                <input
                  onChange={onchange}
                  value={userData.username}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="username"
                  name="username"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={onchange}
                  value={userData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  onChange={onchange}
                  value={userData.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success mt-3"
                  >
                    Register
                  </button>
                </center>
                <center className="mt-2">
                  <Link to="/login">
                    <small style={{ color: "white" }}>Back to Login</small>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="col-3"></div>
    </div>
  );
}

export default Register;
