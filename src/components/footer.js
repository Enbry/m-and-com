import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <nav className="footer">
    <div className="container footer-container">
      <ul className="navbar-menu">
        <li className="navbar-menuItem">
          <Link to="/blog/">
            
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/skills/">
            Expertises
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/projects/">
            Réalisations
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/blog/">
            Actualités
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/blog/">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </nav>)



export default Footer
