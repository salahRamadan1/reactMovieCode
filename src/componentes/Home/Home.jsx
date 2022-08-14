import axios from "axios";
import React, { useEffect, useState } from "react";
import homeCss from "./home.module.css";
import errImg from "./../../img/notfound.png";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Home() {
  let firstNameLocal = localStorage.getItem("userToken");
  let firstName = jwtDecode(firstNameLocal).first_name;
  let lastName = jwtDecode(firstNameLocal).last_name;
  let [getMovies, setGetMovie] = useState([]);
  let [getTv, setGetTv] = useState([]);
  let [getPerson, setGetPerson] = useState([]);
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  async function getMovie(parameter, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${parameter}/day?api_key=b3315a0b057c9d59eb3faa9c609533e1`
    );
    callback(data.results.splice(0, 10));
  }
  useEffect(() => {
    getMovie("movie", setGetMovie);
    getMovie("tv", setGetTv);
    getMovie("person", setGetPerson);
  }, []);

  return (
    <>
      <section className={` ${homeCss.home}  `}>
        <div className={`${homeCss.homeOne}`}>
          <div className="row  mt-5 justify-content-center">
            <div className=" col-sm-12 text-center    text-white d-flex justify-content-center align-items-end  ">
              <div className="item w-50    ">
                <h3 className="h1 pt-5 mt-5  ">
                  Hello {firstName} {lastName}
                  <br />
                  We are happy to have you visit our Noxe website. We wish you a
                  great time
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container text-white mt-5 ">
        {getMovies.length > 0 ? (
          <div className=" row g-5">
            <div className=" col-md-4">
              <div className={`${homeCss.brd} mb-3`}></div>
              <h2>Trending</h2>
              <h2>Movie</h2>
              <h2>To watch now</h2>
              <p className="text-muted">most watched movies by days</p>
              <div className={`${homeCss.brd} w-75 mt-3`}></div>
            </div>
            {getMovies.map((movie, idx) => {
              return (
                <div key={idx} className="col-md-2">
                  <div className="item position-relative">
                    <Link to={`/moviedetails/${movie.id}`}>
                      <img
                        src={imgUrl + movie.poster_path}
                        className="w-100 mb-1"
                        alt=""
                      />
                    </Link>
                    <h4 className=" text-white text-decoration-none ">
                      {movie.original_title.split(" ").splice(0, 2).join(" ")}
                    </h4>
                    <p className=" position-absolute top-0 end-0 bg-info text-white p-2">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className=" d-flex justify-content-center align-items-center my-5">
            Loading......{" "}
          </h2>
        )}
        {getTv.length > 0 ? (
          <div className=" row g-5 mt-3">
            <div className=" col-md-4">
              <div className={`${homeCss.brd} mb-3`}></div>
              <h2>Trending</h2>
              <h2>TV</h2>
              <h2>To watch now</h2>
              <p className="text-muted">most watched movies by days</p>
              <div className={`${homeCss.brd} w-75 mt-3`}></div>
            </div>
            {getTv.map((tv, idx) => {
              return (
                <div key={idx} className="col-md-2">
                  <div className="item position-relative">
                    <Link to={`/tvdetails/${tv.id}`}>
                      <img
                        src={imgUrl + tv.poster_path}
                        className="w-100 mb-1"
                        alt=""
                      />
                    </Link>
                    <h4>{tv.name.split(" ").splice(0, 2).join(" ")}</h4>
                    <p className=" position-absolute top-0 end-0 bg-info text-white p-2">
                      {tv.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className=" d-flex justify-content-center align-items-center my-5">
            Loading......{" "}
          </h2>
        )}
        {getPerson.length > 0 ? (
          <div className=" row g-5 mt-3">
            <div className=" col-md-4">
              <div className={`${homeCss.brd} mb-3`}></div>
              <h2>Trending</h2>
              <h2>Person</h2>
              <h2>To watch now</h2>
              <p className="text-muted">most watched movies by days</p>
              <div className={`${homeCss.brd} w-75 mt-3`}></div>
            </div>
            {getPerson.map((person, idx) => {
              return (
                <div key={idx} className="col-md-2">
                  <div className="item ">
                    {person.profile_path == null ? (
                      <img src={errImg} className="w-100 mb-1" alt="" />
                    ) : (
                      <img
                        src={imgUrl + person.profile_path}
                        className="w-100  mb-1"
                        alt=""
                      />
                    )}
                    <h4>{person.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className=" d-flex justify-content-center align-items-center my-5">
            Loading......{" "}
          </h2>
        )}
      </div>
    </>
  );
}
