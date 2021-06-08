import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login(props) {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3004/login", loginData)
      .then((r) => {
        localStorage.setItem("token", r.data.jwt);
        toast.success(`${r.data.msg}`);
      })
      .then(() => {
        props.history.push("/app");
      })
      .catch((e) => {
        toast.error(`Invalid Login`);
      });
  };

  const style = {
    backgroundColor: "rgb(255, 255, 255, 1)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.7)",
    padding: "50px 30px 50px 30px",
    borderRadius: "20px",
    color: "white",
  };

  return (
    <div className="row" style={style}>
      <div className="col-12 mt-5">
        <center>
          <h3>User Login</h3>
        </center>
      </div>
      <div className="col-3"></div>
      <form className="container mt-5 mb-5 col-6" style={formStyle}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  onChange={onchange}
                  value={loginData.email}
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
                  value={loginData.password}
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
                    Login
                  </button>
                </center>
                <center className="mt-2">
                  <Link to="/register">
                    <small style={{ color: "white" }}>User Registration</small>
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

export default Login;
