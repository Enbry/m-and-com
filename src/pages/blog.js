import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button/button"
import SearchPosts from "../components/searchPosts"
import Navbar from "../components/Navbar/navbar"
import Banner from "../components/Banner/banner"
import Footer from "../components/Footer/footer"

class Blog extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const localSearchItems = data.localSearchItems
    const background = data.backgroundImage.childImageSharp;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Navbar  position="top"/>
        <Banner title="Blog" background={background}/>
        <SearchPosts
          posts={posts}
          localSearchItems={localSearchItems}
          navigate={navigate}
          location={location}
        />
        <Footer />

      </Layout>
    )
  }
}

export default Blog

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
      filter: { fileAbsolutePath: { glob: "**/content/blog/*.md" } }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
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
    backgroundImage: file (relativePath: { eq: "blog.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`
