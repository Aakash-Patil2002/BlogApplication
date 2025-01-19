import React, { useEffect, useState } from "react";
import style from "./Hero.module.css";
import profile from "../../assets/user.png";
import menu from "../../assets/menu.png";
import search from "../../assets/search.png";
import flash from "../../assets/flash.png";
import { Link } from "react-router";
import axios from "axios";

function Hero() {
  const [leftb, setLeftb] = useState("");
  const [midb, setMidb] = useState("");
  const [rightb, setRightb] = useState("");
  const [sidebar, setSidebar] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5001/")
      .then((success) => {
        const left = success.data.blogs.filter((blog) => {
          return blog.tags === "left";
        });
        const mid = success.data.blogs.filter((blog) => {
          return blog.tags === "mid";
        });
        const right = success.data.blogs.filter((blog) => {
          return blog.tags === "right";
        });
        setLeftb(left);
        setMidb(mid);
        setRightb(right);
        setSidebar([...left, ...mid, ...right]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={style.hero}>
      <div className={"self_container"}>
        <div className={style.blogs + " row"}>
          <div className="col-lg-3">
            <section className={style.left_section_blogs}>
              {leftb &&
                leftb.map((blog, idx) => {
                  return (
                    <figure key={idx} className="mb-4">
                      <div>
                        <img
                          className={style.left_blog_img}
                          src={blog.image}
                          alt="blog1"
                        />
                      </div>
                      <figcaption className={style.title_body}>
                        <p className={style.blog_title_para}>
                          <span className={style.category}>
                            {blog.category}
                          </span>{" "}
                          <span className={style.date}>3 Months ago</span>
                        </p>
                        <Link
                          to={`/blogDetail/${blog._id}`}
                          className={style.title}
                        >
                          {blog.title}
                        </Link>
                      </figcaption>
                    </figure>
                  );
                })}
            </section>
          </div>
          <div className="col-lg-6">
            <section className={style.middle_section_blogs + " px-md-2"}>
              {midb &&
                midb.map((blog, idx) => {
                  return (
                    <figure key={idx} className={style.mid_blog}>
                      <img
                        className={style.middle_blog_img}
                        src={blog.image}
                        alt="blog"
                      />
                      <figcaption className={style.mid_img_overlay}>
                        <p className={style.mid_img_title}>
                          <Link to={`/blogDetail/${blog._id}`}>
                            {blog.title}
                          </Link>
                        </p>
                      </figcaption>
                    </figure>
                  );
                })}
            </section>
          </div>
          <div className="col-lg-3">
            <section className={style.right_section_blogs}>
              {rightb &&
                rightb.map((blog, idx) => {
                  return (
                    <figure key={idx} className={style.right_blog}>
                      <img
                        className={style.right_blog_img}
                        src={blog.image}
                        alt="right"
                      />
                      <figcaption className={style.right_blog_overlay}>
                        <div>
                          <p className={style.right_blog_title_para}>
                            <span className={style.category}>
                              {blog.category}
                            </span>{" "}
                            <span className={style.date}>3 Months ago</span>
                          </p>
                          <p className={style.right_blog_title}>
                            <Link to={`/blogDetail/${blog._id}`}>
                              {blog.title}
                            </Link>
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
            </section>
            <div>
              <form className={style.form}>
                <h4>Stay Informed With the Latest & Most Important News</h4>
                <input
                  placeholder="Your email address"
                  className={style.form_inp}
                />
                <p className={style.form_para}>
                  I consent to receive newsletter via email. For further
                  information, please review our <strong>Privacy Policy</strong>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ul className={style.popular}>
        <div className={style.popular_title}>
          Popular <br /> Now
        </div>
        {sidebar &&
          sidebar.map((s, idx) => {
            return (
              <li key={idx}>
                <Link to={`/blogDetail/${s._id}`}>
                  <img src={s.image} alt="" />
                </Link>
              </li>
            );
          })}
      </ul>
      <ul className={style.navlinks}>
        <li>
          <Link to="profile">
            <img src={profile} alt="user" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={menu} alt="menu" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={search} alt="search" />
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={flash} alt="flash" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Hero;
