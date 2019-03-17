import React, { Component } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"

class Frame extends Component {
  render() {
    return (
      <>
      <Header/>
        {this.props.children}
      <Footer {...this.props}/>
      </>
    )
  }
}

export default Frame