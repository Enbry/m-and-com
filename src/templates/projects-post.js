import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumb from "../components/Breadcrumb/breadcrumb"
import Navbar from "../components/Navbar/navbar"
import '../styles/article.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
class ProjectsPostTemplate extends React.Component {
  render() {
    const project = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={project.frontmatter.title}
          description={project.frontmatter.description || project.excerpt}
        />
        <Navbar/>
        <div className="project">
          <Breadcrumb title={`${project.frontmatter.title.slice(0,50)}...`} link="/projects" page="Réalisations"/>

        <div className="project-container">
          <div className="project-content">
            <div className="project-item">
              <h1>{project.frontmatter.title}</h1>
              <p
                style={{display: `block`}}
              >
                {project.frontmatter.date}
              </p>
              <MDXRenderer>{project.body}</MDXRenderer>
            </div>
          </div>
          <div className="project-sidebar"></div>
        </div>

        <ul className="project-navigation">
          <li>
            {previous && (
              <>
                <Link className="project-navigationLink" to={`/projects${previous.fields.slug}`} rel="previous">
                  <FontAwesomeIcon icon={faArrowLeft} className="project-navigationIcon previous"/>
                  <div className="project-navigationItem previous">
                    <p className="project-navigationItemTitle">{`${previous.frontmatter.title.slice(0,30)}...`}</p>
                    <p className="project-navigationItemText">Précédent</p>
                  </div>
                </Link>
              </>
            )}
          </li>
            <li>
              {next && (
                <>
                  <Link className="project-navigationLink" to={`/projects${next.fields.slug}`} rel="next">
                    <div className="project-navigationItem next">
                      <p className="project-navigationItemTitle">{`${next.frontmatter.title.slice(0,30)}...`}</p>
                      <p className="project-navigationItemText">Suivant</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="project-navigationIcon next"/>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default ProjectsPostTemplate

export const pageQuery = graphql`
  query ProjectsPostBySlug($slug: String!) {
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
