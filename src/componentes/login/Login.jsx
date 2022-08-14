import React, { useEffect, useState } from "react";
import loginModule from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function Login(prop) {
  let passwords = document.getElementById("password");
  let showPasswords = document.getElementById("showPassword");
  function passwordAll() {
    if (showPasswords.innerHTML == "hide Password") {
      fadePassword();
    } else {
      showPassword();
    }
  }
  function showPassword() {
    passwords.type = "text";
    showPasswords.innerHTML = "hide Password";
  }
  function fadePassword() {
    passwords.type = "password";
    showPasswords.innerHTML = "Show Password";
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errValidat, setErrValidat] = useState([]);
  const [errApi, setErrApi] = useState("");
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function validator() {
    let validData = Joi.object({
      email: Joi.string()
        .email({ tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$"))
        .required(),
    });
    return validData.validate(user, { abortEarly: false });
  }
  function setUserDate(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function sendData(e) {
    e.preventDefault();
    setLoading(true);
    let valid = validator();

    if (valid.error == null) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message == "success") {
        localStorage.setItem("userToken", data.token);
        navigate("/home");
        prop.tokenUser();
      } else {
        setErrApi(data.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrValidat(valid.error.details);
    }
  }
  return (
    <>
      <div className=" container mt-5 pt-5">
        {errApi ? <h3 className=" alert alert-danger">{errApi}</h3> : ""}
        <div className=" row align-items-center ">
          <div className="col-md-6">
            <h1 className=" text-center text-white">
              WELCOME <br /> TO <br /> OUR NOXE MOVIES
            </h1>
          </div>
          <div className="col-md-6    p-2 ">
            <form className={loginModule.test} onSubmit={sendData}>
              <div>
                <label htmlFor="email" className=" text-white pb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={setUserDate}
                  className=" form-control w-100 bg-transparent text-white"
                />

                {errValidat.map((el, i) => {
                  if (el.path[0] == "email") {
                    return (
                      <p key={i} className=" text-danger">
                        {el.message}
                      </p>
                    );
                  }
                })}
              </div>
              <div>
                <label htmlFor="password" className=" text-white pb-2 mt-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={setUserDate}
                  className=" form-control w-100 bg-transparent text-white"
                />
                <a
                  className=" d-flex justify-content-end showPassword text-white"
                  id="showPassword"
                  onClick={() => {
                    passwordAll();
                  }}
                >
                  Show Password
                </a>
                {errValidat.map((el, i) => {
                  if (el.path[0] == "password") {
                    return (
                      <p key={i} className=" text-danger">
                        You must write the first capital letter, then numbers
                        and letters{" "}
                        <span className="text-info">
                          {" "}
                          (the number of entries is 9 only)
                        </span>
                        <span className=" text-white"> Ex: Asde235</span>
                      </p>
                    );
                  }
                })}
              </div>
              <button className=" btn btn-outline-info mt-2" type="submit">
                {loading ? (
                  <i className="fa-solid fa-spinner  fa-spin text-white"></i>
                ) : (
                  "log in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
