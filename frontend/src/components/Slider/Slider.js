import React from "react";
import style from "./Slider.module.css";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function Slider({ allBlogs }) {
  return (
    <div>
      <Swiper loop={true} >
        {allBlogs &&
          allBlogs.map((blog,idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className={style.slide}>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <img className={style.slider_img} src={blog.image} alt="tree" />
                        </div> 
                      </div>
                      <div className="col-md-6">
                        <div className={style.slider_content}>
                          <p className={style.category}>
                            <Link to="/">{blog.category}</Link>{" "}
                            <Link to="/">3 Month ago</Link>
                          </p>
                          <h3>
                            <Link to={`/blogDetail/${blog._id}`}>
                              {blog.title}
                            </Link>
                          </h3>
                          <p>
                            {blog.content.slice(0,250)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Slider;
