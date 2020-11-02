import React from "react";
import "./footer.scss";
import Navbar from "../Navbar/navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedinIn,
  faFacebookF,
  faTwitter,
  // faCopyright
} from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core'

library.add(
  faLinkedinIn,
  faFacebookF,
  faTwitter,
  // faCopyright
);
const Footer = () => {

  return (
    <nav className="footer">
      <div className="footerLinks">
        <a href="" target="_blank">
          <FontAwesomeIcon className="footerLinksIcon" icon={['fab', 'twitter']} />
        </a>
        <a href="https://www.linkedin.com/company/14071432" target="_blank">
          <FontAwesomeIcon className="footerLinksIcon" icon={['fab', 'linkedin-in']} />
        </a>
        <a href="" target="_blank">
          <FontAwesomeIcon className="footerLinksIcon" icon={['fab', 'facebook-f']} /> 
        </a>
      </div>
      <div className="footerCopyright">
        <p>
          {/* <FontAwesomeIcon className="footerLinksIcon" icon={['far', 'copyright']} /> */}
          Copyright 2020 - Margot Hillion
        </p>
      </div>
      <Navbar position="bottom"/>
    </nav>
  );
};

export default Footer;
