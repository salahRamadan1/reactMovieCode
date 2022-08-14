import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
export default function Tvdetails() {
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  let [getTv, setGetTv] = useState([]);
  let parem = useParams();
  async function getDeTv() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${parem.id}?api_key=b3315a0b057c9d59eb3faa9c609533e1&language=en-US`
    );
    setGetTv(data);
  }
  useEffect(() => {
    getDeTv();
  }, []);
  return (
    <>
      <div className="container mt-5 pt-5">
        <div className="row g-5 align-items-center justify-content-center">
          <div className="col-md-4">
            <a href={getTv.homepage} target={"_blank"}>
              <img
                src={imgUrl + getTv.poster_path}
                className="w-100 h-100 rounded-5"
                alt=""
              />
            </a>
          </div>
          <div className=" col-md-8">
            <h1 className=" text-white">{getTv.original_title}</h1>
            <h3 className=" text-muted">{getTv.tagline}</h3>
            <p className="     text-white">
              Vote Average: {getTv.vote_average}
            </p>
            <p className="   text-white">Vote Count : {getTv.vote_count}</p>
            <p className="  text-white">
              {" "}
              Language : {getTv.original_language}
            </p>
            <p className=" text-white">popularity : {getTv.popularity}</p>
            <p className=" mb-5   mt-2  text-white">
              {" "}
              release_date : {getTv.release_date}
            </p>

            <h4 className=" text-white">
              {" "}
              watch now :{" "}
              <span>
                <a
                  href={getTv.homepage}
                  target="_blank"
                  className=" text-white"
                >
                  View
                </a>
              </span>
            </h4>
            <h3 className=" mt-5 text-muted">{getTv.overview}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
