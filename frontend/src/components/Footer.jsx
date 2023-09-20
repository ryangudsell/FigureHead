import React from "react";

// DONT FORGET TO IMPORT FOOTER IN APP.JSX

const Footer = () => {
  return (
    <>
      <footer>

        {/* This is the div that will have the grid */}
        <div id="footer-grid">

          {/* This is where the items are flexed inside the grid */}
          
          {/* This is for the SafeCard text and logo */}
          <div className="footer-flex">
            <i className="fa-solid fa-shield-halved"></i>
            <p>SafeCard</p>
          </div>

          {/* This is for the socials  */}
          <div className="footer-flex">
            <i className="fa-brands fa-facebook brands"></i>
            <i className="fa-brands fa-instagram brands"></i>
            <i className="fa-brands fa-x-twitter brands"></i>
          </div>

          {/* This is for the Collect & Connect */}
          <div className="footer-flex">
            <p>Collect & Connect</p>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
