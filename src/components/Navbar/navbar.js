import React from "react"
import { Link } from "gatsby"
import './navbar.scss';
import logo from '../../assets/img/logo.png'

const Navbar = () => (
  <nav className="navbar">
    <div className="container navbar-container">
      <img className="navbar-logo" src={logo} alt="M and Com."/>
      <ul className="navbar-menu">
        <li className="navbar-menuItem">
          <Link to="/skills/" activeClassName="active">
            Expertises
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/projects/" activeClassName="active">
            Réalisations
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/blog/" activeClassName="active">
            Actualités
          </Link>
        </li>
        <li className="navbar-menuItem">
          <Link to="/contact/" activeClassName="active">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </nav>)



export default Navbar
