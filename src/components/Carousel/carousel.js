import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './carousel.scss'

const Carousel = ({items, slidesNb}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: slidesNb,
        slidesToScroll: 1,
        autoplay: true
      };

      return(
        <Slider {...settings} className="carousel">
            {items.map(item => (
                <div key={item.node.fields.slug}>
                    <Img className="carouselImg" fluid={item.node.frontmatter.image.image.childImageSharp.fluid} />
                    <h3 className="carouselTitle">{`${item.node.frontmatter.title.slice(0,60)}...`}</h3>
                    <p className="carouselText">{item.node.excerpt}</p>
                </div>
            ))}
        </Slider>
      )
}

export default Carousel
