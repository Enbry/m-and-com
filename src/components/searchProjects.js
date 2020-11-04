import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"
import './search-projects.scss';
import BackgroundImage from 'gatsby-background-image'

const SearchedProjects = ({ results }) =>

  // <h3 className="projectsTitle">
  //   De la <span className="projectsEmphasize">création de marque</span> à son <span className="projectsEmphasize">identité visuelle</span> & ses <span className="projectsEmphasize">outils de communication dédiés</span>,
  //   en passant par la <span className="projectsEmphasize">rédaction du discours de votre marque</span> adaptée à tous les supports, à la <span className="projectsEmphasize">mise en œuvre d’un plan de communication</span> et de diffusion adapté, Chez Margot communication développera LA com’ qu’il vous faut.
  // </h3>
  results.length > 0 ? (
    results.map(node => {
      const date = node.date
      const title = node.title || node.slug
      const description = node.description
      const excerpt = node.excerpt
      const slug = node.slug

      return (
        <div className="projects-item"  key={node.fields.slug}>
          <Link style={{ boxShadow: `none` }} to={`/projects${node.fields.slug}`}>
          <h2 className="projects-itemDesc">
              {title}
          </h2>
          {
            node.frontmatter.images[0].image && (
            <BackgroundImage
              fluid={node.frontmatter.images[0].image.childImageSharp.fluid}
              className="projects-itemBg"
            >
              
            </BackgroundImage>
            )
          }
          </Link>
        </div>
      )
    })
  ) : (
    <p style={{ textAlign: "center" }}>
      Sorry, couldn't find any posts matching this search.
    </p>
  )

const AllProjects = ({ projects }) => (
  <div className="projects">
    <h3 className="projectsTitle">
    De la <span className="projectsEmphasize">création de marque</span> à son <span className="projectsEmphasize">identité visuelle</span> & ses <span className="projectsEmphasize">outils de communication dédiés</span>,
    en passant par la <span className="projectsEmphasize">rédaction du discours de votre marque</span> adaptée à tous les supports, à la <span className="projectsEmphasize">mise en œuvre d’un plan de communication</span> et de diffusion adapté, Chez Margot communication développera LA com’ qu’il vous faut.
    </h3>
    {projects.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
    
      return (
        <div className="projects-item"  key={node.fields.slug}>
          <Link style={{ boxShadow: `none` }} to={`/projects${node.fields.slug}`}>
          <h2 className="projects-itemDesc">
              {title}
          </h2>
          {
            node.frontmatter.images[0].image && (
            <BackgroundImage
              fluid={node.frontmatter.images[0].image.childImageSharp.fluid}
              className="projects-itemBg"
            >
              
            </BackgroundImage>
            )
          }
          </Link>
        </div>
      )
    })}
  </div>
)

const SearchProjects = ({ projects, localSearchItems, location, navigate }) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || "")

  console.log(results);
  const results = useFlexSearch(
    query,
    localSearchItems.index,
    JSON.parse(localSearchItems.store)
  )

  return (
    <>
      {query ? <SearchedProjects results={results} /> : <AllProjects projects={projects} />}
    </>
  )
}

export default SearchProjects
