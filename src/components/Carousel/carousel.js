import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Carousel = ({backgrounds}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      return(
        <Slider {...settings}>
            {backgrounds.map(image => (
                <div key={image.childImageSharp.fluid.src}>
                    <Img fluid={image.childImageSharp.fluid} />
                </div>
            ))}
        </Slider>
      )
}


export default Carousel
