import React from "react"
import { Link} from "gatsby"
import '../styles/index.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button/button"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import Carousel from "../components/Carousel/carousel"
import mapImg from "../assets/map.png"
import slide0 from "../assets/bg/header-1.jpg"
import slide1 from "../assets/bg/header-2.jpg"
import slide2 from "../assets/bg/header-3.jpg"
import slide3 from "../assets/bg/header-4.jpg"
import Image from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMouse, faPhone, faAd, faUserFriends, faComments, faLaptop, faTachometerAlt, faEdit, faEye, faCamera, faVideo } from '@fortawesome/free-solid-svg-icons'
import {
  faLinkedinIn,
  faFacebookF,
  faTwitter,
  // faCopyright
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import BackgroundSlider from 'gatsby-image-background-slider'
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"
import Slider from '../components/Slider/slider'

library.add(faMouse, faPhone, faAd, faUserFriends, faComments, faLaptop, faTachometerAlt, faEdit, faEye, faCamera, faVideo);

const Skills = ({skills}) => (
  <div className="home-skills">
    <h2 className="homeTitle big">9 expertises</h2>
    <h2 className="homeSubtitle">à votre service</h2>
    <div className="home-skillsContent">

      {skills.map(({ node }) => {
        return (
          <Link key={node.fields.slug} className="home-skillsContentItem" to={`/skills${node.fields.slug}`}>
            <FontAwesomeIcon className="home-skillsContentItemIcon" icon={node.frontmatter.icon} />
            <h4 className="home-skillsContentItemTitle">{node.frontmatter.title}</h4>
          </Link>   
        )
      })}
    </div>
    <div className="home-skillsCta">
      <Link to="/skills/">
        <Button title="En savoir plus" className="red" icon="true"></Button>
      </Link>
    </div>
  </div>
)

const Projects = ({projects}) => (
  <div className="home-projects">
    <h3 className="home-projectsTitle">
    De la <span className="home-projectsEmphasize">création de marque</span> à son <span className="home-projectsEmphasize">identité visuelle</span> & ses <span className="home-projectsEmphasize">outils de communication dédiés</span>,
    en passant par la <span className="home-projectsEmphasize">rédaction du discours de votre marque</span> adaptée à tous les supports, à la <span className="home-projectsEmphasize">mise en œuvre d’un plan de communication</span> et de diffusion adapté, Chez Margot communication développera LA com’ qu’il vous faut.
    </h3>
    {projects.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <div className="home-projectsItem"  key={node.fields.slug}>
          <Link style={{ boxShadow: `none` }} to={`/projects${node.fields.slug}`}>
          <h2 className="home-projectsItemDesc">
              {title}
          </h2>
          {
            node.frontmatter.images[0].image && (
              <BackgroundImage
                fluid={node.frontmatter.images[0].image.childImageSharp.fluid}
                className="home-projectsItemBg"
              >
              </BackgroundImage>
            )
          }
          </Link>
        </div>
      )
    })}
  </div>
)

const Articles = ({articles}) => (
  <div className="home-articles">
    <h2 className="homeTitle">Les articles qu'il ne fallait pas manquer</h2>
    <div className="home-articlesContent">
      <Carousel items={articles} slidesNb={3}/>
    </div>
    <div className="home-articlesCta">
      <Link to="/articles/">
        <Button title="Voir tous les articles" className="purple" icon="true"></Button>
      </Link>
    </div>
  </div>
)
class IndexPage extends React.Component {
  constructor () {
    super()
    this.state = {
      axis: 'x'
    }
    this.setAxis = axis => {
      return () => this.setState({'axis': axis})
    }
  }
  render() {
    const { data } = this.props

    const skills = data.skills.edges
    const projects = data.projects.edges
    const articles = data.articles.edges
    const backgrounds = data.backgrounds.nodes

    return (
      <Layout location={this.props.location}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Navbar position="top"/>
        <section className="home">
          <header className="home-header">
            <div className="home-headerBg">
            </div>
            <div>
              <span className={this.state.axis === 'x' ? 'axis current' : 'axis'}
                onClick={this.setAxis('x')}></span>
              <span className={this.state.axis === 'y' ? 'axis current' : 'axis'}
                onClick={this.setAxis('y')}></span>
            </div>
            <Slider loop auto axis={this.state.axis} className="home-headerSlider">
              <div className="home-headerSliderItem" style={{backgroundImage:`url(${slide0})`, height: '100%'}}></div>
              <div className="home-headerSliderItem" style={{backgroundImage:`url(${slide1})`, height: '100%'}}></div>
              <div className="home-headerSliderItem" style={{backgroundImage:`url(${slide2})`, height: '100%'}}></div>
              <div className="home-headerSliderItem" style={{backgroundImage:`url(${slide3})`, height: '100%'}}></div>
            </Slider>
            <div className="home-headerContent">
              <div className="home-headerText">
                  <h1 className="home-headerTextTitle">Apporter</h1>
                  <h2 className="home-headerTextSubtitle">de la <span className="home-headerTextSubtitle--bold">visibilité</span> et du public à vos <span className="home-headerTextSubtitle--bold">ambitions</span></h2>
              </div>
              <FontAwesomeIcon  className="home-headerMouse" icon="mouse" size="3x"/>
            </div>
          </header>
          
          <div>
            <Skills skills={skills} />
            <div className="home-cta">
              <h2 className="homeTitle white">Un projet à concrétiser ?</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
              <div className="home-ctaBg">
                <Img fluid={data.gradient.childImageSharp.fluid}></Img>
              </div>
              <Link to="/contact/" activeClassName="active">
                  <Button title="Parlons de votre projet" className="purple no-border"></Button>
              </Link>
            </div>

            <Projects projects={projects} />
            {/* <div className="home-testimonials">
              <h2 className="homeTitle">Ils nous ont fait confiance</h2>
              
            </div> */}
            

            <Articles articles={articles} />
            <div className="home-contact">
              <h2 className="homeTitle big">Contact</h2>
              <div className="home-contactContent">

                <div className="home-contactBlock">
                  <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
                    <input type="hidden" name="bot-field" />
                    <input type="hidden" name="form-name" value="contact" />
                    <label className="home-contactFormLabel">
                      <input className="home-contactFormInput" type="text" name="name" placeholder="Nom"/>
                    </label>
                    <label className="home-contactFormLabel">
                      <input className="home-contactFormInput" type="text" name="surname" placeholder="Prénom"/>
                    </label>
                    <label className="home-contactFormLabel">
                      <input className="home-contactFormInput" type="email" name="email" placeholder="Email"/>
                    </label>
                    <label className="home-contactFormLabel">
                      <textarea className="home-contactFormInput" rows="10" name="message" placeholder="Votre message"></textarea>
                    </label>
                    <div className="home-contactCta">
                      <Button title="Envoyer" className="red"  icon="true" submit="true"></Button>
                    </div>
                  </form>
                </div>
                <div className="home-contactBlock">
                  <div className="home-contactMap">
                    <img className="home-contactMapImg" src={mapImg}></img>
                    <h4>Coordonnées</h4>
                    <div className="home-contactInformation">
                      <p>
                        <FontAwesomeIcon className="home-contactInformationIcon" icon="comments" />
                        contact@margothillion.com
                      </p>
                      <p>
                        <FontAwesomeIcon className="home-contactInformationIcon" icon="phone" />
                        89 53 26 28
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchItems {
      index
      store
    }
    skills: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/content/skills/*.md" } }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            icon
          }
        }
      }
    }
    projects: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/content/projects/*.md" } }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            images{
              image {
                childImageSharp {
                  fluid (quality: 100){
                  ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/content/articles/*.md" } }
      limit: 6
      ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            image {
              imageAlt
              image {
                childImageSharp {
                    fluid (maxWidth: 4000, quality: 100){
                    ...GatsbyImageSharpFluid
                    }
                }
              }
            }
          }
        }
      }
    }
    backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){
      nodes {
          relativePath
          childImageSharp {
              fluid (quality: 100){
              ...GatsbyImageSharpFluid
              }
          }
      }
    }
    gradient: file (relativePath: { eq: "gradient.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`