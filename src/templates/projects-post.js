import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumb from "../components/Breadcrumb/breadcrumb"
import Img from "gatsby-image"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"

import '../styles/projects.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
        <Navbar position="top"/>
        <div className="project">
          <Breadcrumb title={`${project.frontmatter.title.slice(0,50)}`} link="/projects" page="Réalisations"/>

        <div className="project-container">
          <div className="project-content">
            <div className="project-item">
              <h2 className="project-itemTitle">{project.frontmatter.title}</h2>
              <p className="project-itemHash">{project.frontmatter.subtitle}</p>
              <h3 className="project-itemBrief">{project.frontmatter.brief}</h3>

              <div className="project-itemMissions">
                <h4 className="project-itemSubtitle">Missions</h4>
                <ul className="project-itemMissionsList">
                  {project.frontmatter.missions && project.frontmatter.missions.map((mission, index) => {
                    return(
                      <li key={index} className="project-itemMissionsListItem">
                       <FontAwesomeIcon icon={faChevronRight} className="project-itemMissionsListItemIcon"/>
                        {mission.text}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="project-itemClients">
                <h4 className="project-itemSubtitle">Le client</h4>
                {project.frontmatter.clients}
                {/* <MDXRenderer>{project.frontmatter.clients}</MDXRenderer> */}
              </div>

              <div className="project-itemLinks">
                <h4 className="project-itemSubtitle">Liens</h4>
                  {project.frontmatter.links}
                  {/* <MDXRenderer>{project.frontmatter.links}</MDXRenderer> */}
              </div>
            </div>
          </div>
              <div className="project-pictures">
                <div className="project-picturesItem">
                {
                  project.frontmatter.images && project.frontmatter.images[0].image && (
                  <Img fluid={project.frontmatter.images[0].image.childImageSharp.fluid}/>
                  )
                }
                </div>
              </div>

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
        <Footer />

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
        subtitle
        date(formatString: "MMMM DD, YYYY")
        description
        brief
        clients
        images{
          image {
            childImageSharp {
              fluid (maxWidth: 4000, quality: 100){
              ...GatsbyImageSharpFluid
              }
            }
          }
        }
        missions{
          text
        }
        medias
        links
      }
    }
  }
`
