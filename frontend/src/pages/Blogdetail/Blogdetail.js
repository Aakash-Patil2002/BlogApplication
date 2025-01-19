import React, { useEffect, useState } from "react";
import style from "./Blogdetail.module.css";
import { Link, useParams } from "react-router";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Blogdetail() {
  const [blog, setblog] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/getDetails/${id}`)
      .then((success) => {
        setblog(success.data.blog);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
        <div className="col-10 mx-auto">
          <figure className={style.figure}>
            <img className={style.blogImg} src={blog.image} alt="" />
            <figcaption>
              <div>
                <p>
                  <Link className={style.catgory} to="/">
                    Technology.Travel
                  </Link>
                </p>
                <h3 className={style.title}>{blog.title}</h3>
                <p className={style.post_snippet}>{blog.content}</p>
                <div className="d-flex justify-content-between">
                <h4 className={style.readMore + " m-0"}>
                      By : 
                      {blog && blog.userdetails.username}
                    </h4>
                    <p className={style.readMore + " m-0"}>On : 
                    {blog && JSON.stringify(blog.createdAt).slice(1,11)}
                    </p>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Blogdetail;
