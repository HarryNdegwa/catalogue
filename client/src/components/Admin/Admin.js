import React from "react";
import { BsGift, BsListUl, BsQuestionCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./Admin.css";
import AdminHeader from "./AdminHeader";

class Admin extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content">
          <AdminHeader />
          <div className="custom-width container pt-4">
            <h3>Welcome Admin,</h3>
            <div className="d-flex justify-content-end">
              <Link to="/add-product" className="btn btn-lg custom-button">
                Add Product
              </Link>
            </div>
            <div className="row admin-content mt-5">
              <div className="col-md-4 admin-content-wrapper">
                <h5 className="mb-2">Products</h5>
                <BsGift style={{ fontSize: "80px", color: "#d31c27" }} />

                <div
                  style={{ textAlign: "left", width: "90%", margin: "auto" }}
                >
                  <ul className="admin-content-links">
                    <li>
                      <Link to="/all">
                        <div>
                          <p>All</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/hot-deals">
                        <div>
                          <p>Hot Deals</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/live-products">
                        <div>
                          <p>Live</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/out-of-stock">
                        <div>
                          <p>Out of stock</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/returned-products">
                        <div>
                          <p>Returns</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 admin-content-wrapper">
                <h5 className="mb-2">Orders</h5>
                <BsListUl style={{ fontSize: "80px", color: "#d31c27" }} />
                <div
                  style={{ textAlign: "left", width: "90%", margin: "auto" }}
                >
                  <ul className="admin-content-links">
                    <li>
                      <Link to="/">
                        <div>
                          <p>New</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div>
                          <p>Dispatched</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div>
                          <p>Successful</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 admin-content-wrapper">
                <h5 className="mb-2">Queries</h5>
                <BsQuestionCircle
                  style={{ fontSize: "80px", color: "#d31c27" }}
                />
                <div
                  style={{ textAlign: "left", width: "90%", margin: "auto" }}
                >
                  <ul className="admin-content-links">
                    <li>
                      <Link to="/">
                        <div>
                          <p>All</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div>
                          <p>Read</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div>
                          <p>Unread</p> <p>10</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-footer">
          <p>Hey</p>
        </div>
      </div>
    );
  }
}

export default Admin;
