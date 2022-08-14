import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
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
  let [errVa, setErrVa] = useState([]);

  const [err, setErr] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });
  function getUserDate(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function sendData(e) {
    setLoading(true);
    let validResult = validUser();
    e.preventDefault();
    if (validResult.error == null) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      let h3 = document.getElementById("err");
      if (data.message == "success") {
        setLoading(false);
        navigate("/login");
      } else {
        setErr(data.message);
        setLoading(false);
      }
    } else {
      setLoading(false);

      setErrVa(validResult.error.details);
    }
  }

  function validUser() {
    let validData = Joi.object({
      first_name: Joi.string().min(2).max(10).required(),
      last_name: Joi.string().min(2).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$"))
        .required(),
    });
    return validData.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className=" container mt-5 pt-5 ">
        <h1 className="text-white fs-1 mt-">Registration Form </h1>
        {err ? (
          <h4 id="err" className="alert alert-danger">
            {err} <Link to={"/login"}>login?</Link>
          </h4>
        ) : (
          ""
        )}

        <form onSubmit={sendData}>
          <div>
            <label htmlFor="first_name" className="text-white">
              {" "}
              First name{" "}
            </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              onChange={getUserDate}
              className="mt-2 form-control text-white bg-transparent"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "first_name") {
                return (
                  <p key={i} className="  t text-danger pt-1">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>

          <div className="mt-2">
            <label htmlFor="last_name" className="text-white">
              {" "}
              Last name{" "}
            </label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              onChange={getUserDate}
              className="mt-2 form-control text-white bg-transparent"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "last_name") {
                return (
                  <p key={i} className="    text-danger pt-2 ">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="mt-2">
            <label htmlFor="age" className="text-white">
              {" "}
              Age{" "}
            </label>
            <input
              id="age"
              type="number"
              name="age"
              onChange={getUserDate}
              className="mt-2 form-control text-white bg-transparent"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "age") {
                return (
                  <p key={i} className="    text-danger pt-2 ">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="text-white">
              {" "}
              Email{" "}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={getUserDate}
              className="mt-2 form-control text-white bg-transparent"
            />
            {errVa.map((el, i) => {
              if (el.path[0] == "email") {
                return (
                  <p key={i} className="    text-danger pt-2 ">
                    {el.message}
                  </p>
                );
              }
            })}
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="text-white">
              {" "}
              password{" "}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={getUserDate}
              className="mt-2 form-control text-white bg-transparent"
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
            {errVa.map((el, i) => {
              if (el.path[0] == "password") {
                return (
                  <p key={i} className=" text-danger">
                    You must write the first capital letter, then numbers and
                    letters{" "}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
