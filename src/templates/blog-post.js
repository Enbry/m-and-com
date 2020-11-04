import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumb from "../components/Breadcrumb/breadcrumb"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import '../styles/blog.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
class BlogsPostTemplate extends React.Component {
  render() {
    const blog = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={blog.frontmatter.title}
          description={blog.frontmatter.description || blog.excerpt}
        />
        <Navbar position="top"/>
        <Breadcrumb title={`${blog.frontmatter.title.slice(0,50)}...`} link="/blogs" page="Blog"/>
        <div className="blog">
          <div className="blog-container">
            <div className="blog-content">
              <div className="blog-item">
                <Img fluid={blog.frontmatter.image.image.childImageSharp.fluid} />
                <div className="blog-itemContent">
                  <h2 className="blog-itemTitle">{blog.frontmatter.title}</h2>
                  <p
                    className="blog-itemDate"
                    style={{display: `block`}}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} className="blogs-itemDateIcon"/>
                    {blog.frontmatter.date}
                  </p>
                  <div className="blog-itemBody">
                    <MDXRenderer>{blog.body}</MDXRenderer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="blog-sidebar"></div>
          </div>
          <ul className="blog-navigation">
              <li>
                {previous && (
                  <>
                    <Link className="blog-navigationLink" to={`/blog${previous.fields.slug}`} rel="previous">
                      <FontAwesomeIcon icon={faArrowLeft} className="blog-navigationIcon previous"/>
                      <div className="blog-navigationItem previous">
                        <p className="blog-navigationItemTitle">{`${previous.frontmatter.title.slice(0,30)}...`}</p>
                        <p className="blog-navigationItemText">Précédent</p>
                      </div>
                    </Link>
                  </>
                )}
              </li>
              <li>
                {next && (
                  <>
                    <Link className="blog-navigationLink" to={`/blog${next.fields.slug}`} rel="next">
                      <div className="blog-navigationItem next">
                        <p className="blog-navigationItemTitle">{`${next.frontmatter.title.slice(0,30)}...`}</p>
                        <p className="blog-navigationItemText">Suivant</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="blog-navigationIcon next"/>
                    </Link>
                  </>
                )}
              </li>
            </ul>
        </div>
        <Footer />

      </Layout>
    )
  }
}

export default BlogsPostTemplate

export const pageQuery = graphql`
  query BlogsPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        image {
          imageAlt
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
`
