import React from "react"
import { Link } from "gatsby"
import './navbar.scss';
import logo from '../../assets/img/logo.png'

const Navbar = ({position}) => (
  <nav className={`navbar ${position}`}>
    <div className="container navbar-container">
    <Link to="/" activeClassName="active">
      <img className="navbar-logo" src={logo} alt="M and Com."/>
    </Link>
      <ul className="navbar-menu">
        <Link to="/skills/" className="navbar-menuItem" activeClassName="active">
          Expertises
        </Link>
        <Link to="/projects/" className="navbar-menuItem" activeClassName="active">
          Réalisations
        </Link>
        <Link to="/articles/" className="navbar-menuItem" activeClassName="active">
          Actualités
        </Link>
        <Link to="/blog/" className="navbar-menuItem" activeClassName="active">
          Blog
        </Link>
        <Link to="/contact/" className="navbar-menuItem" activeClassName="active">
          Contact
        </Link>
      </ul>
    </div>
  </nav>
)

export default Navbar
