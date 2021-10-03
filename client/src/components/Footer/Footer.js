import React from "react";
import { Link } from "react-router-dom";
import { BiRightArrow } from "react-icons/bi";

import "./Footer.css";
import {
  AiFillFacebook,
  AiFillGooglePlusSquare,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { FaPinterestSquare, FaTwitterSquare } from "react-icons/fa";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="custom-width py-2">
          <div className="row">
            <div className="col-6 col-md-3 mb-4">
              <h6 className="mb-1">About Electro</h6>
              <ul>
                <li>
                  <Link to="/">About Electro</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <h6 className="mb-1">My Electro</h6>
              <ul>
                <li>
                  <Link to="/account">My Account</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <h6 className="mb-1">Help & FAQs</h6>
              <ul>
                <li>
                  <Link to="/">Help Center</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <h6 className="mb-1">Ways To Shop</h6>
              <ul>
                <li>
                  <Link to="/hot-deals">Hot Deals</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr style={{ backgroundColor: "#fff" }} />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p>Sign up for electro newsletters</p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn custom-button" type="button">
                    <BiRightArrow />
                  </button>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 footer-social-icons"
              style={{ fontSize: "30px" }}
            >
              <span>
                <AiFillFacebook />
              </span>
              <span>
                <FaTwitterSquare />
              </span>
              <span>
                <AiFillInstagram />
              </span>
              <span>
                <AiFillYoutube />
              </span>
              <span>
                <FaPinterestSquare />
              </span>
              <span>
                <AiFillGooglePlusSquare />
              </span>
            </div>
          </div>

          <div
            className="mt-5 mb-3"
            style={{ textAlign: "center", fontSize: "12px" }}
          >
            <p style={{ color: "#ccc" }}>
              Copyright &copy; {new Date().getFullYear()} Electro Nairobi,Kenya
              Inc. All Rights Reserved. <Link to="/">Terms of use</Link> |{" "}
              <Link to="/">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
