import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchProjects from "../components/searchProjects"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import Banner from "../components/Banner/banner"
class Projects extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const projects = data.allMdx.edges
    const localSearchItems = data.localSearchItems
    const background = data.backgroundImage.childImageSharp;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All projects" />
        <Navbar  position="top"/>
        <Banner title="Réalisations" background={background}/>
        <SearchProjects
          projects={projects}
          localSearchItems={localSearchItems}
          navigate={navigate}
          location={location}
        />
        <Footer />
        
      </Layout>
    )
  }
}

export default Projects

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
    allMdx(
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
    backgroundImage: file (relativePath: { eq: "header-2.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`
