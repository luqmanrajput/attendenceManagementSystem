import React, { Component } from "react";
import "../About/About.css";

export default class AboutUs extends Component {
  render() {
    return (
      <>
        <section className="about">
          <div className="main-about-container">
            {/* <img src="images/aboutus.jpg" alt=""/> */}
            <div className="about-text">
              <h1>About Us</h1>
              <h5>
                <span>Attendence</span> Management System
              </h5>
              <p>
                <em>
                  <highlight>AMS</highlight> is React based web application for
                  managing attendence. It includes features like marking
                  attendence, applying for leave and viewing the attendence.
                  This application has been devloped using MERN STACK
                </em>
              </p>
              <a className="aboutUsBtn" href="https://luqmanrajput.github.io/">
                Contact Developer
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}
