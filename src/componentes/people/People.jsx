import axios from "axios";
import React, { useEffect, useState } from "react";
import errImg from "./../../img/notfound.png";

export default function People() {
  let [getPersons, setPerson] = useState([]);
  let imgUrl = "https://image.tmdb.org/t/p/w500";
  async function getPersonData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/day?api_key=b3315a0b057c9d59eb3faa9c609533e1`
    );
    setPerson(data.results);
  }
  useEffect(() => {
    getPersonData();
  }, []);
  return (
    <>
      <div className=" container mt-5 pt-5">
        {getPersons.length > 0 ? (
          <div className=" row g-2">
            {getPersons.map((person, id) => {
              return (
                <div key={id} className=" col-md-2">
                  {person.profile_path == null ? (
                    <img src={errImg} className="w-100" alt="" />
                  ) : (
                    <img
                      src={imgUrl + person.profile_path}
                      className="w-100"
                      alt=""
                    />
                  )}
                  <h1 className=" text-white">{person.original_name}</h1>
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
