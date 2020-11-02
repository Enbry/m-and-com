import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Breadcrumb from "../components/Breadcrumb/breadcrumb"
import Img from "gatsby-image"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"

import '../styles/skills.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
class SkillsPostTemplate extends React.Component {
  render() {
    const skill = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={skill.frontmatter.title}
          description={skill.frontmatter.description || skill.excerpt}
        />
        <Navbar position="top"/>
        <div className="skill">
          <Breadcrumb title={skill.frontmatter.title} link="/skills" page="Expertises"/>

        <div className="skill-container">
          <div className="skill-content">
            <div className="skill-item">
              <h2 className="skill-itemTitle">{skill.frontmatter.title}</h2>
              <p className="skill-itemHash">{skill.frontmatter.subtitle}</p>
              {/* <h3 className="skill-itemBrief">{skill.frontmatter.brief}</h3> */}
              <MDXRenderer>{skill.body}</MDXRenderer>

              <div className="skill-itemMissions">
                <h4 className="skill-itemSubtitle">Process</h4>
                {/* <ul className="skill-itemMissionsList">
                  {skill.frontmatter.missions.map(mission => {
                    return(
                      <li className="skill-itemMissionsListItem">
                       <FontAwesomeIcon icon={faChevronRight} className="skill-itemMissionsListItemIcon"/>
                        {mission.text}
                      </li>
                    )
                  })}
                </ul> */}
              </div>
            </div>
          </div>
          <div className="skill-pictures">
            <div className="skill-picturesItem">
              {/* {
                skill.frontmatter.images[0].image && (
                  <Img fluid={skill.frontmatter.images[0].image.childImageSharp.fluid}/>
                )
              } */}
            </div>
          </div>
        </div>

        <ul className="skill-navigation">
          <li>
            {previous && (
              <>
                <Link className="skill-navigationLink" to={`/skills${previous.fields.slug}`} rel="previous">
                  <FontAwesomeIcon icon={faArrowLeft} className="skill-navigationIcon previous"/>
                  <div className="skill-navigationItem previous">
                    <p className="skill-navigationItemTitle">{previous.frontmatter.title}</p>
                    {/* <p className="skill-navigationItemText">Précédent</p> */}
                  </div>
                </Link>
              </>
            )}
          </li>
            <li>
              {next && (
                <>
                  <Link className="skill-navigationLink" to={`/skills${next.fields.slug}`} rel="next">
                    <div className="skill-navigationItem next">
                      <p className="skill-navigationItemTitle">{next.frontmatter.title}</p>
                      {/* <p className="skill-navigationItemText">Suivant</p> */}
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="skill-navigationIcon next"/>
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

export default SkillsPostTemplate

export const pageQuery = graphql`
  query SkillsPostBySlug($slug: String!) {
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
