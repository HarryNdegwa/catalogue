import React from 'react'
import { IoIosCart } from "react-icons/io";
import { Link } from 'react-router-dom';

import "./EmptyCart.css"
import Footer from '../Footer/Footer'
import MainHeader from '../MainHeader/MainHeader'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import TopHeader from '../TopHeader/TopHeader'




class EmptyCart extends React.Component{
    render(){
        return (<div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width empty-cart">
            
            <IoIosCart style={{fontSize:"100px",color:"#d31c27"}} />
            <p>You have no items in your cart yet.</p>
            <Link to="/" className="btn btn-md mt-3 custom-button">Go Shopping</Link>
          </div>
        </div>
        <Footer />
      </div>)
    }
}

export default EmptyCart