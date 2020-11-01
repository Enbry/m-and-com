import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchArticles from "../components/searchArticles"
import Navbar from "../components/Navbar/navbar"
import Banner from "../components/Banner/banner"

class Articles extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const articles = data.allMdx.edges
    const localSearchItems = data.localSearchItems
    const background = data.backgroundImage.childImageSharp;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All articles" />
        <Navbar />
        <Banner title="Actualités" background={background}/>
        <SearchArticles
          articles={articles}
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

export default Articles

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
      filter: { fileAbsolutePath: { glob: "**/content/articles/*.md" } }
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
    backgroundImage: file (relativePath: { eq: "header-3.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`
