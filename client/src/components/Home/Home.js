import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import SmallScreenRandom from "./SmallScreenRandom";
import { FaLongArrowAltRight } from "react-icons/fa";
import CountDown from "react-countdown";
import { connect } from "react-redux";

import "./Home.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import Footer from "../Footer/Footer";
import Products from "../Products/Products";
import Random from "./Random";
import countRenderer from "../CountDownRenderer/CountDownRenderer";
import { fetchProductsThunkActionCreator } from "../../redux/actions/productsActions";
import { BASE_URL } from "../../axiosApi";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.randomData = [
      { title: "Laptops", url: "/laptops", src: "/rl.jpeg" },
      { title: "SmartPhones", url: "/smartphones", src: "/rs.jpg" },
      { title: "Accessories", url: "/accessories", src: "/ra.png" },
    ];

    this.state = {
      smallScreenRandomData: [],
    };
  }

  componentDidMount() {
    this.setState({
      smallScreenRandomData: [
        { title: "Laptops", url: "/laptops", src: "/rl.jpeg" },
        { title: "SmartPhones", url: "/smartphones", src: "/rs.jpg" },
        { title: "Accessories", url: "/accessories", src: "/ra.png" },
      ],
    });

    this.props.fetchProductsThunkActionCreator(`${BASE_URL}products/`);
  }
  render() {
    return (
      <div className="home main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width">
            <div className="randoms my-4">
              {this.randomData.map((data, idx) => (
                <Random key={idx} data={data} />
              ))}
            </div>
            <div className="small-screen-randoms my-3">
              {this.state.smallScreenRandomData.length === 0 && (
                <SmallScreenRandom />
              )}
              {this.state.smallScreenRandomData.length > 0 && (
                <Carousel controls={false}>
                  {this.state.smallScreenRandomData.map((data, idx) => (
                    <Carousel.Item key={idx} className="slider">
                      {" "}
                      <div className="slider-wrapper">
                        <Link to={data.url}>
                          {" "}
                          <div
                            className="inner-small-random-text"
                            style={{ color: "white" }}
                          >
                            <h5>{data.title}</h5>
                            <h5>Collection</h5>
                            <p
                              className="mt-2 d-flex"
                              style={{
                                textTransform: "uppercase",
                                fontSize: "13px",
                                alignItems: "center",
                              }}
                            >
                              <strong>Shop Now</strong>
                              <span className="ml-1">
                                <FaLongArrowAltRight />
                              </span>
                            </p>
                          </div>
                          <img alt="random" src={data.src} />
                          <div className="triangle-topleft2"></div>
                        </Link>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
            <div className="home-content-header my-2">
              <h4>PRODUCTS</h4>
            </div>
            <Products />
          </div>
          <div className="container-fluid my-5 p-0" id="hot-deal">
            <Link to="/hot-deals">
              <div
                className="v"
                style={{ height: "100%", width: "85%", margin: "auto" }}
              >
                <div
                  className="row home-deal-wrapper"
                  style={{ height: "100%" }}
                >
                  <div
                    className="col-md-4 p-0"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <img src="/dp.png" height="250px" alt="deal" />
                  </div>
                  <div
                    className="col-md-4 px-0"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "250px",
                      padding: "30px 0px",
                    }}
                  >
                    <CountDown
                      date={Date.now() + 500000000}
                      renderer={countRenderer}
                      style={{ height: "100px" }}
                    />
                    <h4>HOT DEALS THIS WEEK</h4>
                    <h5>UPTO 50% OFF</h5>
                  </div>
                  <div
                    className="col-md-4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <img src="/da.png" height="250px" alt="deal" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuth: state.authReducer.isAuth };
};

export default connect(mapStateToProps, { fetchProductsThunkActionCreator })(
  Home
);
