import React from "react"
import styled from "styled-components"
import "./button.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faChevronRight);

const Button = ({title, className, icon, submit}) => (
  <button className={`button ${className}`} type={submit ? 'submit' : ''}>
    {title}
    {
      icon && (
        <FontAwesomeIcon icon={faChevronRight} className="buttonIcon"/>
      )
    }
    </button>
)

export default Button
