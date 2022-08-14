import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Login from "./componentes/login/Login.jsx";
import Movies from "./componentes/movies/Movies.jsx";
import People from "./componentes/people/People.jsx";
import Register from "./componentes/register/Register.jsx";
import NavBar from "./componentes/Navbar/NavBar";
import Home from "./componentes/Home/Home";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import MovieDitailes from "./componentes/MovieDitails/MovieDitailes";
import Tvdetails from "./componentes/Tvdetails/Tvdetails";
import Tv from "./componentes/Tv/Tv";

export default function App() {
  let [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  function setUserToken() {
    let token = localStorage.getItem("userToken");

    setUserData(jwtDecode(token));
  }
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken();
    } else {
      navigate("/login");
    }
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <NavBar user={userData} logOutUser={logOut} />
      <div className="mt-5  ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home user={userData} />} />
          <Route path="movies" element={<Movies />} />
          <Route path="moviedetails" element={<MovieDitailes />}>
            <Route path=":id" element={<MovieDitailes />} />
          </Route>
          <Route path="tvdetails" element={<Tvdetails />}>
            <Route path=":id" element={<Tvdetails />} />
          </Route>
          <Route path="people" element={<People />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login tokenUser={setUserToken} />} />
          <Route path="tv" element={<Tv />} />
          <Route
            path="*"
            element={
              <h3 className=" text-white text-center mt-5 pt-5">
                Not found.....
              </h3>
            }
          />
        </Routes>
      </div>
    </>
  );
}
