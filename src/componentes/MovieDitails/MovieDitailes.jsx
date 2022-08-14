import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function MovieDitailes() {
  let [getDetails, setGetDetails] = useState([]);
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  let { id } = useParams();
  async function getDetailsMovie() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b3315a0b057c9d59eb3faa9c609533e1&language=en-US`
    );
    setGetDetails(data);
  }
  useEffect(() => {
    getDetailsMovie();
  }, []);
  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row g-5 align-items-center justify-content-center">
          <div className="col-md-4">
            <a href={getDetails.homepage} target="_blank">
              <img
                src={imgUrl + getDetails.poster_path}
                className="w-100 h-100 rounded-5"
                alt=""
              />
            </a>
          </div>
          <div className=" col-md-8">
            <h1 className=" text-white">{getDetails.original_title}</h1>
            <h3 className=" text-muted">{getDetails.tagline}</h3>
            <p className="     text-white">
              Vote Average: {getDetails.vote_average}
            </p>
            <p className="   text-white">
              Vote Count : {getDetails.vote_count}
            </p>
            <p className="  text-white">
              {" "}
              Language : {getDetails.original_language}
            </p>
            <p className=" text-white">popularity : {getDetails.popularity}</p>
            <p className=" mb-5   mt-2  text-white">
              {" "}
              release_date : {getDetails.release_date}
            </p>

            <h4 className=" text-white">
              {" "}
              watch now :{" "}
              <span>
                <a
                  href={getDetails.homepage}
                  target="_blank"
                  className=" text-white"
                >
                  View
                </a>
              </span>
            </h4>
            <h3 className=" mt-5 text-muted">{getDetails.overview}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
