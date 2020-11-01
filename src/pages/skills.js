import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchSkills from "../components/searchSkills"
import Navbar from "../components/Navbar/navbar"
import Banner from "../components/Banner/banner"
class Skills extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const skills = data.allMdx.edges
    const localSearchItems = data.localSearchItems
    const background = data.backgroundImage.childImageSharp;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All skills" />
        <Navbar />
        <Banner title="Expertises" background={background}/>
        <SearchSkills
          skills={skills}
          localSearchItems={localSearchItems}
          navigate={navigate}
          location={location}
        />
        <Link to="/">
          <Button marginTop="85px">Go Home</Button>
        </Link>
      </Layout>
    )
  }
}

export default Skills

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
          }
        }
      }
    }
    backgroundImage: file (relativePath: { eq: "header-1.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`
