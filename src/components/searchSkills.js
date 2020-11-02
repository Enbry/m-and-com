import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"
import './search-skills.scss';
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"
import { faChevronRight, faAd, faUserFriends, faComments, faLaptop, faTachometerAlt, faEdit, faEye, faCamera, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faChevronRight, faAd, faUserFriends, faComments, faLaptop, faTachometerAlt, faEdit, faEye, faCamera, faVideo);

const SearchedSkills = ({ results }) =>
  results.length > 0 ? (
    results.map(node => {
      const date = node.date
      const title = node.title || node.slug
      const description = node.description
      const excerpt = node.excerpt
      const slug = node.slug

      return (
        <div key={slug}>
          <h3>
            <Link style={{ boxShadow: `none` }} to={`/skills${slug}`}>
              {title}
            </Link>
          </h3>
          <small>{date}</small>
          <p
            dangerouslySetInnerHTML={{
              __html: description || excerpt,
            }}
          />
        </div>
      )
    })
  ) : (
    <p style={{ textAlign: "center" }}>
      Sorry, couldn't find any posts matching this search.
    </p>
  )

const AllSkills = ({ skills, background }) => (
  <div className="skills">
    {skills.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
    
      return (
        <div className="skills-item"  key={node.fields.slug}>
          <Link className="skills-itemBlock" style={{ boxShadow: `none` }} to={`/skills${node.fields.slug}`}>
            {/* <Img fluid={background.fluid} /> */}
            <FontAwesomeIcon className="skills-itemIcon" icon={node.frontmatter.icon} />
            
            <h2 className="skills-itemTitle">
              {title}
            </h2>
            <p className="skills-itemDesc">
              {node.excerpt}
            </p>
            <h4 className="skills-itemLink">
              <FontAwesomeIcon icon={faChevronRight} className="skills-itemLinkIcon"/>
              En savoir plus
            </h4>
          </Link>
        </div>
      )
    })}
  </div>
)

const SearchSkills = ({ skills, localSearchItems, location, navigate, background }) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || "")

  const results = useFlexSearch(
    query,
    localSearchItems.index,
    JSON.parse(localSearchItems.store)
  )

  return (
    <>
      {query ? <SearchedSkills results={results} /> : <AllSkills skills={skills} background={background} />}
    </>
  )
}

export default SearchSkills
