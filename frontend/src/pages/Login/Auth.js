import React, { useRef, useState } from "react";
import style from "./Auth.module.css";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router";
import axios from "axios";
function Auth({ isLogin }) {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [allError, setAllError] = useState(false);
  const [errormsg, seterrormsg] = useState("");

  const loginhandler = (e) => {
    e.preventDefault();
    if (email.current.value === "" && password.current.value === "") {
      setAllError(true);
    } else if (email.current.value === "" || password.current.value === "") {
      if (email.current.value === "") {
        setEmailError(true);
        setPassError(false);
      }
      if (password.current.value === "") {
        setPassError(true);
        setEmailError(false);
      }
    } else {
      setEmailError(false);
      setPassError(false);
      setAllError(false);
      axios
        .post("http://localhost:5001/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((success) => {
          if (success.data) {
            localStorage.setItem("token", success.data.token);
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.data.msg) {
            setError(true);
            seterrormsg(error.response.data.msg);
          }
        });
    }
  };
  const singuphandler = (e) => {
    e.preventDefault();

    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passpattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!emailpattern.test(email.current.value)) {
      setEmailError(true);
    }
    if (!passpattern.test(password.current.value)) {
      setPassError(true);
      setError(false);
    }
    if (username.current.value === "") {
      setUserError(true);
    }

    if (emailpattern.test(email.current.value)) {
      setEmailError(false);
    }
    if (passpattern.test(password.current.value)) {
      setPassError(false);
    }
    if (username.current.value !== "") {
      setUserError(false);
    }
    if (
      emailpattern.test(email.current.value) &&
      passpattern.test(password.current.value) &&
      username.current.value !== ""
    ) {
      setEmailError(false);
      setPassError(false);
      setUserError(false);
      setAllError(false);
      axios
        .post("http://localhost:5001/register", {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        })
        .then((success) => {
          if (success.data) {
            localStorage.setItem("token", success.data.token);
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.data.msg) {
            setError(true);
            seterrormsg(error.response.data.msg);
          }
        });
    }
  };
  return (
    <section className={style.authbody}>
      <div className={style.authForm}>
        <div>
          <div className={style.authTitle}>
            <Link className="order-2 d-block d-sm-inline mb-3" to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <div className="order-1">
              <h2>{isLogin ? "Login" : "Register"}</h2>
              {isLogin ? (
                <p>Lets stats with login your account</p>
              ) : (
                <p>Lets stats with register your account</p>
              )}
            </div>
          </div>
          <form onSubmit={isLogin ? loginhandler : singuphandler}>
            {!isLogin && (
              <div className={style.inputItem}>
                <input
                  type="text"
                  placeholder="Username"
                  className={style.input}
                  ref={username}
                />
                <p className={userError ? style.vshow : style.vhide}>
                  Username is required
                </p>
              </div>
            )}

            <div className={style.inputItem}>
              <input
                type="text"
                placeholder="Email"
                ref={email}
                className={style.input}
              />
              <p className={emailError ? style.vshow : style.vhide}>
                Enter Valid Email
              </p>
            </div>
            <div className={style.inputItem}>
              <input
                type="password"
                placeholder="Password"
                className={style.input}
                ref={password}
              />
              <p
                className={
                  passError || allError || error ? style.vshow : style.vhide
                }
              >
                {!error
                  ? passError
                    ? "Enter Valid Password"
                    : "Email and password are required"
                  : errormsg}
              </p>
            </div>

            <button type="submit" className={style.authBtn}>
              {isLogin ? "Sign In" : "Sign Up"}
            </button>

            <p className="mt-3">
              Not a member? &nbsp;
              {isLogin ? (
                <Link to={"/signup"}>Sign Up.</Link>
              ) : (
                <Link to={"/login"}>Sign In.</Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Auth;
