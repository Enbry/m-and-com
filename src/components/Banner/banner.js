import React from "react"
import './banner.scss';
import Img from "gatsby-image"

const Banner = ({title, background}) => (
  <div className="banner">
    <h1 className="banner-title">{title}</h1>
    <Img fluid={background.fluid} className="banner-bg" />
  </div>
)

export default Banner
