import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";

import "./EmptyWishlist.css"
import Footer from '../Footer/Footer'
import MainHeader from '../MainHeader/MainHeader'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import TopHeader from '../TopHeader/TopHeader'




class EmptyWishlist extends React.Component{
    render(){
        return (<div className="main">
        <div className="content">
          <TopHeader />
          <MainHeader />
          <SecondaryHeader />
          <div className="custom-width empty-cart">       
            <FaRegHeart style={{fontSize:"100px",color:"#d31c27"}} />
            <p>You have no saved items yet.Click on the heart icon to save an item.</p>
            <Link to="/" className="btn btn-md mt-3 custom-button">Go Shopping</Link>
          </div>
        </div>
        <Footer />
      </div>)
    }
}

export default EmptyWishlist