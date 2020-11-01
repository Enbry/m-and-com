import React from "react"
import { Link } from "gatsby"
import './breadcrumb.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = ({title, link, page}) => (
  <div className="breadcrumb">
      <ul className="breadcrumb-list">
          <li className="breadcrumb-listLink">
            <Link to={link}>{page}</Link>
          </li>
          <FontAwesomeIcon className="breadcrumb-separator" icon={faChevronRight}/>
          <li className="breadcrumb-listItem">
              {title}
          </li>
      </ul>
  </div>
)

export default Breadcrumb
