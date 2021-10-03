import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import WishList from "./Account/WishList";
import Deals from "./Deals/Deals";
import Laptops from "./Laptops/Laptops";
import SmartPhones from "./SmartPhones/SmartPhones";
import Accessories from "./Accessories/Accessories";
import MainProduct from "./MainProduct/MainProduct";
import LoginForm from "./Login/Login";
import RegisterForm from "./Register/Register";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Admin from "./Admin/Admin";
import LiveProducts from "./Admin/LiveProducts";
import OutOfStock from "./Admin/OutOfStock";
import ReturnedProducts from "./Admin/Returned";
import { unAuth, user } from "../redux/actions/rootActions";
import {
  fetchWishListCountThunkAction,
  wishListZero,
} from "../redux/actions/wishlistActions";
import { fetchCartCountThunkAction } from "../redux/actions/cartActions";
import ProductForm from "./Admin/ProductForm";
import ProductDescription from "./Admin/ProductDescription";
import MobileMenu from "./MobileMenu/MobileMenu";
import OpenHamburger from "./MobileMenu/OpenHamburger";
import Order from "./Account/AccountOrder";
import Contact from "./Contact/Contact";
import About from "./About/About";
import ProductImages from "./Admin/ProductImages";
import Account from "./Account/Account";
import Publish from "./Admin/Publish";
import CheckOut from "./CheckOut/CheckOut";
import Payment from "./Payment/Payment";
import EmptyWishlist from "./Account/EmptyWishlist";
import EmptyCart from "./Cart/EmptyCart";
import All from "./Admin/All";
import EditProductForm from "./Admin/EditProductForm";
import ProductEditImages from "./Admin/ProductEditImages";
import ProductEditDescription from "./Admin/ProductEditDescription";
import axios from "../axiosApi";
import OrderDetails from "./Account/OrderDetails";
import ComingSoon from "../ComingSoon";
import Search from "./Search/Search";
import PaymentSuccess from "./Payment/PaymentSuccess";
import PaymentError from "./Payment/PaymentError";

class App extends React.Component {
  state = {
    mobileMenuOpen: false,
  };

  intervalID = 0;

  toggleMobileMenu = () => {
    this.setState((prevState) => {
      return {
        mobileMenuOpen: !prevState.mobileMenuOpen,
      };
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.lvl === 1 || this.props.lvl === 2) {
  //     this.intervalID = setInterval(() => {
  //       this.props.unAuth();
  //       this.props.wishListZero();
  //     }, 604800000);
  //   } else {
  //     clearInterval(this.intervalID);
  //   }
  // }

  render() {
    const { lvl, _id } = this.props;
    if (lvl === 1 || lvl === 2) {
      axios
        .get("fetch/user/", {
          headers: {
            Authorization: "Token " + _id,
          },
        })
        .then((res) => {
          // this.props.user(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
      this.props.fetchWishListCountThunkAction();
      this.props.fetchCartCountThunkAction();
    }
    return (
      <div>
        {this.state.mobileMenuOpen ? (
          <MobileMenu action={this.toggleMobileMenu} />
        ) : null}
        {this.state.mobileMenuOpen ? null : (
          <OpenHamburger action={this.toggleMobileMenu} />
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route
            path="/cart"
            render={() =>
              lvl === 1 || lvl === 2 ? <Cart /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/wishlist"
            render={() =>
              lvl === 1 || lvl === 2 ? <WishList /> : <Redirect to="/login" />
            }
          />
          {/* <Route
            path="/orders"
            render={() =>
              lvl === 1 || lvl === 2 ? <Order /> : <Redirect to="/login" />
            }
          /> */}
          <Route path="/orders" component={Order} />
          <Route path="/order-details" component={OrderDetails} />
          <Route path="/contact-us" component={Contact} />
          {/* <Route
            path="/contact-us"
            render={() =>
              lvl === 1 || lvl === 2 ? <Contact /> : <Redirect to="/login" />
            }
          /> */}
          <Route
            path="/account"
            render={() =>
              lvl === 1 || lvl === 2 ? <Account /> : <Redirect to="/login" />
            }
          />
          {/* <Route path="/account" component={Account} /> */}
          <Route
            path="/checkout"
            render={() =>
              lvl === 1 || lvl === 2 ? <CheckOut /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/payment"
            render={() =>
              lvl === 1 || lvl === 2 ? <Payment /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/payment-success"
            render={() =>
              lvl === 1 || lvl === 2 ? (
                <PaymentSuccess />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/payment-error"
            render={() =>
              lvl === 1 || lvl === 2 ? (
                <PaymentError />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/about" component={About} />
          <Route path="/empty-wishlist" component={EmptyWishlist} />
          <Route path="/empty-cart" component={EmptyCart} />
          <Route path="/hot-deals" component={Deals} />
          <Route path="/laptops" component={Laptops} />
          <Route path="/smartphones" component={SmartPhones} />
          <Route path="/accessories" component={Accessories} />
          <Route path="/main-product" component={MainProduct} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/coming-soon" component={ComingSoon} />
          <Route
            path="/admin"
            render={() => (lvl === 1 ? <Admin /> : <Redirect to="/login" />)}
          />

          <Route
            path="/all"
            render={() => (lvl === 1 ? <All /> : <Redirect to="/login" />)}
          />

          <Route
            path="/live-products"
            render={() =>
              lvl === 1 ? <LiveProducts /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/out-of-stock"
            render={() =>
              lvl === 1 ? <OutOfStock /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/returned-products"
            render={() =>
              lvl === 1 ? <ReturnedProducts /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/add-product"
            render={() =>
              lvl === 1 ? <ProductForm /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/product/description"
            render={() =>
              lvl === 1 ? <ProductDescription /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/product/edit/description"
            render={() =>
              lvl === 1 ? <ProductEditDescription /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/product/images"
            render={() =>
              lvl === 1 ? <ProductImages /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/product/edit/images"
            render={() =>
              lvl === 1 ? <ProductEditImages /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/publish"
            render={() => (lvl === 1 ? <Publish /> : <Redirect to="/login" />)}
          />

          <Route
            path="/edit-product"
            render={() =>
              lvl === 1 ? <EditProductForm /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lvl: state._root.lvl,
    _id: state._root._id,
  };
};

export default connect(mapStateToProps, {
  unAuth,
  fetchWishListCountThunkAction,
  wishListZero,
  fetchCartCountThunkAction,
  user,
})(App);
