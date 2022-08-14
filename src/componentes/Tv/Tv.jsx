import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Tv() {
  let imgUrl = "https://image.tmdb.org/t/p/w500";

  let [getTvDetails, setGetTvDetails] = useState([]);
  async function getTv() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=b3315a0b057c9d59eb3faa9c609533e1"
    );
    setGetTvDetails(data.results);
  }
  useEffect(() => {
    getTv();
  }, []);
  return (
    <>
      <div className=" container mt-5 pt-5">
        {getTvDetails.length > 0 ? (
          <div className=" row">
            {getTvDetails.map((tv, idx) => {
              return (
                <div key={idx} className=" col-md-2">
                  <div className="item position-relative">
                    <Link to={`/tvdetails/${tv.id}`}>
                      <img
                        src={imgUrl + tv.poster_path}
                        className="w-100 mb-1"
                        alt=""
                      />
                    </Link>
                    <h4 className=" text-white text-decoration-none ">
                      {tv.original_name}
                    </h4>
                    <p className=" position-absolute top-0 end-0 bg-info text-white p-2">
                      {tv.vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2 className=" d-flex justify-content-center align-items-center my-5 text-white">
            Loading......{" "}
          </h2>
        )}
      </div>
    </>
  );
}
