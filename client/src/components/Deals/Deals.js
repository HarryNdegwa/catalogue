import React from "react";
import { connect } from "react-redux";
import CountDown from "react-countdown";
import "./Deals.css";
import TopHeader from "../TopHeader/TopHeader";
import MainHeader from "../MainHeader/MainHeader";
import Footer from "../Footer/Footer";
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";
import DealSkeleton from "./DealSkeleton";
import { persistSlug } from "../../redux/actions/rootActions";
import {
  dealsFetchStart,
  // dealsFetchStop,
  dealsFetchError,
  dealsFetched,
} from "../../redux/actions/dealActions";
import axios from "../../axiosApi";
import { BASE_URL } from "../../axiosApi";
import CountRenderer from "./CountRenderer";
import { Link } from "react-router-dom";

let processImageUrls = (data) => {
  data.map((d, idx) => {
    const imgUrls = d.img_urls.split(",");
    let newImgUrls = imgUrls.map((url, idx) => {
      return `${BASE_URL}${url.substring(1)}`;
    });
    d.img_urls = newImgUrls;
    return d;
  });
  return data;
};

class Deals extends React.Component {
  state = {
    deals: null,
  };

  handleLinkClick = (e, slug) => {
    this.props.persistSlug(slug);
  };

  componentDidMount() {
    this.props.dealsFetchStart();
    axios
      .get("deals/")
      .then((res) => {
        processImageUrls(res.data);
        this.setState({
          deals: res.data,
        });
        this.props.dealsFetched();
      })
      .catch((error) => {
        console.log(error);
        this.props.dealsFetchError();
      });
  }
  render() {
    // const { fetched, fetchingDeals } = this.props;
    return (
      <div className="deals main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />

          <div className="custom-width">
            <h3 className="mb-3">Hot Deals</h3>
            <div className="row" style={{ minHeight: "250px" }}>
              <div className="col-md-9">
                {!this.state.deals ? (
                  <DealSkeleton />
                ) : (
                  <React.Fragment>
                    {this.state.deals.map((deal, idx) => (
                      <div key={deal.id} className="row">
                        <div className="col-6">
                          <img src={deal.img_urls[0]} alt="img" width="70%" />
                        </div>
                        <div className="col-6 pl-0 d-flex justify-content-center flex-column">
                          <h5
                            style={{
                              width: "100%",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {deal.name}
                          </h5>
                          <CountDown
                            date={Date.now() + deal.deal_duration * 100000000}
                            renderer={CountRenderer}
                          />
                          <Link
                            to={`/main-product/${deal.slug}`}
                            onClick={(e) => this.handleLinkClick(e, deal.slug)}
                            className="deal-link"
                          >
                            Get It Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
              <div className="col-md-3 mega-badge-wrapper">
                <div id="burst">
                  <div id="burst-inner">
                    <p>
                      <small>Latest Deals</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchingDeals: state.dealReducer.fetchingDeals,
    fetched: state.dealReducer.dealsFetched,
  };
};

export default connect(mapStateToProps, {
  dealsFetchStart,
  dealsFetched,
  dealsFetchError,
  persistSlug,
})(Deals);
