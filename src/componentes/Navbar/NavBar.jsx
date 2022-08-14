import React from "react";
import { Link } from "react-router-dom";
import img from "../../img/logo-dark.webp";
import $ from "jquery";
export default function NavBar({ logOutUser, user }) {
  $(window).scroll(function () {
    let nav = $(".navbar").offset().top;
    if (nav > "5") {
      $(".navbar").css("backgroundColor", "#12151f");
    } else {
      $(".navbar").css("backgroundColor", "#1a1e2a");
    }
  });
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-lg  fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={img} alt="" />
          </a>
          <button
            className="navbar-toggler bg-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-black"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* padges */}
            {user ? (
              <ul className="navbar-nav me-auto mb-2 pt-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"home"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"movies"}>
                    Movie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"tv"}>
                    Tv Show
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to={"people"}>
                    People
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            {/* icon */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div className=" d-flex">
                <li className="nav-item">
                  <i className="fa-brands fa-facebook icon1 text-white fs-5 m-3"></i>
                </li>
                <li className="nav-item">
                  <i className="fa-brands  icon2 fa-instagram m-3 text-white fs-5"></i>
                </li>
                <li className="nav-item">
                  <i className="fa-brands fa-twitter m-3 icon1 text-white fs-5"></i>
                </li>
                <li className="nav-item">
                  <i className="fa-brands fa-spotify m-3 icon3 text-white fs-5"></i>
                </li>
              </div>

              {/* Setting */}
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle mt-2 "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item " to={"login"}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item " to={"register"}>
                      Register
                    </Link>

                    {user ? (
                      <a onClick={logOutUser} className="dropdown-item logout ">
                        Log out
                      </a>
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
