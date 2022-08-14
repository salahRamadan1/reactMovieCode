import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Movies() {
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  let [getMovies, setGetMovies] = useState([]);
  async function getMovie() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=b3315a0b057c9d59eb3faa9c609533e1`
    );
    setGetMovies(data.results);
  }
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <>
      <div className=" container mt-5 pt-5">
        {getMovies.length > 0 ? (
          <div className=" row">
            {getMovies.map((movie, idx) => {
              return (
                <div key={idx} className=" col-md-2">
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
          <h2 className=" d-flex justify-content-center align-items-center my-5 text-white">
            Loading......{" "}
          </h2>
        )}
      </div>
    </>
  );
}
