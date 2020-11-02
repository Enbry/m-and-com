import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumb from "../components/Breadcrumb/breadcrumb"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import '../styles/article.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
class ArticlesPostTemplate extends React.Component {
  render() {
    const article = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={article.frontmatter.title}
          description={article.frontmatter.description || article.excerpt}
        />
        <Navbar position="top"/>
        <Breadcrumb title={`${article.frontmatter.title.slice(0,50)}...`} link="/articles" page="Actualités"/>
        <div className="article">
          <div className="article-container">
            <div className="article-content">
              <div className="article-item">
                <Img fluid={article.frontmatter.image.image.childImageSharp.fluid} />
                <div className="article-itemContent">
                  <h2 className="article-itemTitle">{article.frontmatter.title}</h2>
                  <p
                    className="article-itemDate"
                    style={{display: `block`}}
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} className="articles-itemDateIcon"/>
                    {article.frontmatter.date}
                  </p>
                  <div className="article-itemBody">
                    <MDXRenderer>{article.body}</MDXRenderer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="article-sidebar"></div>
          </div>
          <ul className="article-navigation">
              <li>
                {previous && (
                  <>
                    <Link className="article-navigationLink" to={`/articles${previous.fields.slug}`} rel="previous">
                      <FontAwesomeIcon icon={faArrowLeft} className="article-navigationIcon previous"/>
                      <div className="article-navigationItem previous">
                        <p className="article-navigationItemTitle">{`${previous.frontmatter.title.slice(0,30)}...`}</p>
                        <p className="article-navigationItemText">Précédent</p>
                      </div>
                    </Link>
                  </>
                )}
              </li>
              <li>
                {next && (
                  <>
                    <Link className="article-navigationLink" to={`/articles${next.fields.slug}`} rel="next">
                      <div className="article-navigationItem next">
                        <p className="article-navigationItemTitle">{`${next.frontmatter.title.slice(0,30)}...`}</p>
                        <p className="article-navigationItemText">Suivant</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRight} className="article-navigationIcon next"/>
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

export default ArticlesPostTemplate

export const pageQuery = graphql`
  query ArticlesPostBySlug($slug: String!) {
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
