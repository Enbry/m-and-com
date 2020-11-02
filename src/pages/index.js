import React from "react"
import { Link, useStaticQuery} from "gatsby"
import '../styles/index.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import Carousel from "../components/Carousel/carousel"
import Image from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAd, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import BackgroundSlider from 'gatsby-image-background-slider'
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"

library.add(faAd, faUserFriends);

const Skills = ({skills}) => (
  <div className="home-skills">
    {skills.map(({ node }) => {
      return (
        <div key={node.fields.slug}>
          <h6>{node.frontmatter.title}</h6>
          <FontAwesomeIcon icon={node.frontmatter.icon} />
          {/* <Image
            fluid={node.frontmatter.icon.childImageSharp.fluid}
          /> */}
        </div>
      )
    })}
  </div>
)

const Projects = ({projects}) => (
  <div className="home-projects">
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
    <h2 className="homeSubtitle">Les articles qu'il ne fallait pas manquer</h2>
    <Carousel items={articles} slidesNb={3}/>
    
    {/* {articles.map(({ node }) => {
      const articlesBg = [];
      articles.forEach( article => {
        articlesBg.push(article.node.frontmatter.image.image)
      })
      return (
        <div key={node.fields.slug}>
          <h6>{node.frontmatter.title}</h6>
        </div>
      )
    })} */}
  </div>
)
class IndexPage extends React.Component {
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
            {/* <Carousel backgrounds={backgrounds}/> */}
            {/* <img src={headerImg} alt="Gatsby Scene" className="home-header-bg"/> */}
          </header>
          
          <div>

            <Skills skills={skills} />
            <Projects projects={projects} />
            <div className="home-testimonials">
              <h2 className="homeSubtitle">Ils nous ont fait confiance</h2>
              
            </div>
            <div className="home-cta">
              <h2 className="homeSubtitle white">Un projet à concrétiser ?</h2>
              <div className="home-ctaBg">
                <Img fluid={data.gradient.childImageSharp.fluid}></Img>
              </div>
              <Button>En savoir plus</Button>
            </div>
            <Articles articles={articles} />
            <div className="home-contact">
              <h2 className="homeSubtitle">Contact</h2>
              <div className="home-contactContent">

                <div className="home-contactBlock">
                  {/* <form className="home-contactForm" method="post" action="https://getform.io/f/ea07a596-28d9-41bc-9fab-8deeb55d027f"> */}
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
                    <button type="submit">Send</button>
                  </form>
                </div>
                <div className="home-contactBlock">
                
                  <div className="home-contactMap">
                    
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