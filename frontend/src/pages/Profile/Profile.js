import React, { useEffect, useState } from "react";
import BlogForm from "../../components/BlogForm/BlogForm";
import axios from "axios";
import style from "./Profile.module.css";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router";
import Footer from "../../components/Footer/Footer";

function Profile() {
  const navigate = useNavigate();
  const [myblogs, setMyblogs] = useState("");
  const [newblog, setNewblog] = useState(true);
  const [delblog, setDelblog] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5001/myblogs/${token}`)
      .then((response) => {
        if (response) {
          setMyblogs(response.data.myblogs);
        } else {
          console.log("this is navigate");
        }
      })
      .catch((error) => {
        if (error) {
          navigate("/login");
        }
      });
  }, [newblog,delblog,navigate]);

  const deleteBlog=(blogId)=>{
    if(window.confirm("Are you sure to delete")){

      axios.get(`http://localhost:5001/deleteblog/${blogId}`).then((success)=>{
        if(success){
          alert(success.data.msg);
          setDelblog(!delblog);
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  return (
    <>
      <Header />
      <div className={style.profile}>
        <div className="container">
          <div className="row">
            <div className={style.right_part + " col-lg-7"}>
              <h2 className={style.myblog_heading}>My Blogs</h2>
              <div>
                {myblogs &&
                  myblogs.map((blog, idx) => {
                    return (
                      <figure key={idx} className={style.figure}>
                        <img
                          className={style.blogImg}
                          src={blog.image}
                          alt={blog.title}
                        />
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
                                By : {blog.userdetails.username}
                              </h4>
                              <button className="btn btn-outline-danger" onClick={()=>deleteBlog(blog._id)}>Delete Blog</button>
                              <p className={style.readMore + " m-0"}>
                                On : {JSON.stringify(blog.createdAt).slice(1,11)}
                              </p>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    );
                  })}
              </div>
            </div>
            <div className="col-lg-5">
            <div className={style.right_section}>
              <BlogForm newblog={newblog} setNewblog={setNewblog} />
              <div>
                <form className={style.form}>
                  <h4>Stay Informed With the Latest & Most Important News</h4>
                  <input
                    placeholder="Your email address"
                    className={style.form_inp}
                  />
                  <p className={style.form_para}>
                    I consent to receive newsletter via email. For further
                    information, please review our{" "}
                    <strong>Privacy Policy</strong>
                  </p>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Profile;
