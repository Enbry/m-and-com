import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"
import Img from "gatsby-image"
import './search-articles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

const SearchBar = styled.div`
  display: flex;
  border: 1px solid #dfe1e5;
  border-radius: 50px;
  width: 100%;
  height: 3rem;
  background: #fdfdfd;

  svg {
    margin: auto 1rem;
    height: 20px;
    width: 20px;
    color: #9aa0a6;
    fill: #9aa0a6;
  }

  input {
    display: flex;
    flex: 100%;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    padding-right: 0.5rem;
    color: rgb(55, 53, 47);
    word-wrap: break-word;
    outline: none;
  }
`

const SearchedArticles = ({ results }) =>
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
            <Link style={{ boxShadow: `none` }} to={`/articles${slug}`}>
              {title}
            </Link>
          </h3>
          {/* <Img fluid={node.image.image.childImageSharp.fluid} /> */}

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

const AllArticles = ({ articles }) => (
  <>
    {articles.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <div className="articles-item" key={node.fields.slug}>
          <Link style={{ boxShadow: `none` }} to={`/articles${node.fields.slug}`}>
            <div className="articles-itemImage">
              <Img fluid={node.frontmatter.image.image.childImageSharp.fluid} />
            </div>
            <div className="articles-itemContent">
              <h2 className="articles-itemTitle">
                  {title}
              </h2>

              <small className="articles-itemDate">
                <FontAwesomeIcon icon={faCalendarAlt} className="articles-itemDateIcon"/>
                {node.frontmatter.date}
                </small>
              <p
                className="articles-itemDesc"
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          </Link>
        </div>
      )
    })}
  </>
)

const SearchArticles = ({ articles, localSearchItems, location, navigate }) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || "")

  const results = useFlexSearch(
    query,
    localSearchItems.index,
    JSON.parse(localSearchItems.store)
  )

  return (
    <div className="articles">
      <div className="articles-container">
        {query ? <SearchedArticles results={results} /> : <AllArticles articles={articles} />}
      </div>
      <div className="articles-search">
        <SearchBar>
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <input
            id="search"
            type="search"
            placeholder="Recherche"
            value={query}
            onChange={e => {
              navigate(
                e.target.value ? `/articles/?search=${e.target.value}` : "/articles/"
              )
              setQuery(e.target.value)
            }}
          />
        </SearchBar>

      </div>
    </div>
  )
}

export default SearchArticles
