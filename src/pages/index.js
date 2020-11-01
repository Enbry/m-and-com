import React from "react"
import { Link, useStaticQuery} from "gatsby"
import '../styles/index.scss';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import Navbar from "../components/Navbar/navbar"
import Carousel from "../components/Carousel/carousel"
// import headerImg from "../assets/img/header-1.jpg"
import Image from "gatsby-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAd, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import BackgroundSlider from 'gatsby-image-background-slider'

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
      return (
        <div key={node.fields.slug}>
          <h6>{node.frontmatter.title}</h6>
        </div>
      )
    })}
  </div>
)

const Articles = ({articles}) => (
  <div className="home-articles">
    {articles.map(({ node }) => {
      return (
        <div key={node.fields.slug}>
          <h6>{node.frontmatter.title}</h6>
        </div>
      )
    })}
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
        <Navbar />
        <section className="home">
          <header className="home-header">
            {/* <Carousel backgrounds={backgrounds}/> */}
            {/* <img src={headerImg} alt="Gatsby Scene" className="home-header-bg"/> */}
          </header>
          
          <div className="container">

            <Skills skills={skills} />
            <Projects projects={projects} />
            <Articles articles={articles} />
          </div>
        </section>
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
          }
        }
      }
    }
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/content/blog/*.md" } }
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
  }
`