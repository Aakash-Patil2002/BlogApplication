import React, { useState } from "react";
import food from "../../assets/food.webp";
import health from "../../assets/health.webp";
import style from "./Blog.module.css";
import fashion from "../../assets/fashion.webp";
import interior from "../../assets/living-room.webp";
import lifestyle from "../../assets/beach.webp";
import { Link } from "react-router";
function Blog({ allBlogs }) {
  const [todosPerPage]=useState(4);
  const [currentPage,setCurrentPage]=useState(0);
  const totlePages=(Math.ceil(allBlogs.length/todosPerPage)+1);
  const firstIndex=todosPerPage * currentPage;
  
  const lastIndex=firstIndex + todosPerPage;
  
  const blogsslice=[...allBlogs].slice(firstIndex,lastIndex);
  const pages=[...Array(totlePages).keys()].slice(1);


  return (
    <div className="container-md">
      <div className="d-none d-md-block py-5">
        <div className="row justify-content-between">
          <div className="col-2">
            <div>
              <div className={style.filter_opt_img}>
                <img src={fashion} alt="food" />
              </div>
              <div className={style.filter_opt_content}>
                <h4>Fashion</h4>
                <p>Articles</p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className={style.filter_opt_img}>
                <img src={food} alt="food" />
              </div>
              <div className={style.filter_opt_content}>
                <h4>Food</h4>
                <p>Articles</p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className={style.filter_opt_img}>
                <img src={health} alt="food" />
              </div>
              <div className={style.filter_opt_content}>
                <h4>health</h4>
                <p>Articles</p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className={style.filter_opt_img}>
                <img src={interior} alt="food" />
              </div>
              <div className={style.filter_opt_content}>
                <h4>Interior</h4>
                <p>Articles</p>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className={style.filter_opt_img}>
                <img src={lifestyle} alt="food" />
              </div>
              <div className={style.filter_opt_content}>
                <h4>Lifestyle</h4>
                <p>Articles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
            {blogsslice &&
              blogsslice.map((blog, idx) => {
                return (
                  <div className="col-md-6" key={idx}>
                    <figure key={idx} className={style.figure}>
                      <img className={style.blogImg} src={blog.image} alt="" />
                      <figcaption>
                        <div>
                          <p>
                            <Link className={style.catgory} to="/">
                              Technology.Travel
                            </Link>
                          </p>
                          <h3 className={style.title}>
                          <Link to={`/blogDetail/${blog._id}`}>
                          {blog.title}
                          </Link>
                          </h3>
                          <p className={style.post_snippet}>{blog.content.slice(0,200)}...</p>
                          <div className="d-sm-flex justify-content-between">
                            <Link className={style.readMore +" mb-3"} to={`/blogDetail/${blog._id}`}>
                              Read More
                            </Link>
                            <div className="d-flex justify-content-between gap-2">
                              <h4 className={style.readMore + " m-0"}>
                                By : {blog.userdetails.username}
                              </h4>
                              
                              <p className={style.readMore + " m-0"}>
                                On : {JSON.stringify(blog.createdAt).slice(1,11)}
                              </p>

                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
        </div>
      </div>
      <div className={style.pagination}>
        <div className={style.pagBtn} onClick={() => setCurrentPage(currentPage - 1)}><i className="fa-solid fa-angles-left"></i> Prev </div>
        {pages.map((no, ind) => {
          return (
            <div className={style.pagBtn} key={ind} style={currentPage===(no-1) ? {"backgroundColor":"#111","color":"#fff"}:{}} onClick={() => setCurrentPage(no-1)}>
              {no}
            </div>
          );
        })}
        <div className={style.pagBtn} onClick={() => setCurrentPage(currentPage + 1)}> Next <i className="fa-solid fa-angles-right"></i></div>
      </div>
    </div>
  );
}

export default Blog;
