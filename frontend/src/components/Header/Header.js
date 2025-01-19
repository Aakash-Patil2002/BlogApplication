import React from "react";
import style from "./Header.module.css";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.webp";
function Header() {
  const navigate = useNavigate();
  const userTocken = localStorage.getItem("token");
  const logout = () => {
    if (window.confirm("Are you sure to logout")) {
      localStorage.setItem("token", "");
      navigate("/");
    }
  };

  const login = () => {
    navigate("/login");
  };
  return (
    <header className={style.header}>
      <div className={style.header_top}>
        <div className="container">
          <nav className="d-flex justify-content-between">
            <ul className={style.navlist}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Blogs</Link>
              </li>
            </ul>
            <ul className={style.social_list + " d-none d-lg-flex"}>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-google-plus-g"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-solid fa-wifi"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-tumblr"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-dribbble"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-behance"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fa-brands fa-pinterest"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={style.header_bottom}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h2>
              <img className={style.logo} src={logo} alt="logog" />
            </h2>
            {userTocken ? (
              <button onClick={logout} className="btn btn-outline-dark">
                Logout
              </button>
            ) : (
              <button onClick={login} className="btn btn-outline-dark">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
