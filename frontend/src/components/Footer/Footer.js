import React from "react";
import style from "./Footer.module.css";
import logo from "../../assets/footer-logo.webp";
function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 mb-3">
            <div className="mb-3">
              <img className={style.foot_logo} src={logo} alt="logo" />
            </div>
            <p className={style.para}>
              Our platform covers everything from global events and politics to
              entertainment, technology, and lifestyle, ensuring you never miss
              a story.
            </p>
          </div>
          <div className="col-sm-6 col-md-3 mb-3">
            <ul className={style.links_list}>
              <li className={style.links_heading}>Links</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditons</li>
              <li>Why Us</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3 mb-3">
          <ul className={style.links_list}>
              <li className={style.links_heading}>menu</li>
              <li>Partners & Certifications</li>
              <li>Case Studies</li>
              <li>Events & FAQ</li>
              <li>Solutions</li>
              <li>Reviews & Awards</li>
            </ul>
          </div> 
          <div className="col-sm-6 col-md-3 mb-3">
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
    </footer>
  );
}

export default Footer;
