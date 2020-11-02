import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button/button"
import SearchProjects from "../components/searchProjects"
import Navbar from "../components/Navbar/navbar"
import Footer from "../components/Footer/footer"
import Banner from "../components/Banner/banner"
import mapImg from "../assets/map.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faComments } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../styles/contact.scss';


library.add(faPhone, faComments);

class Contact extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const localSearchItems = data.localSearchItems
    const background = data.backgroundImage.childImageSharp;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Contact" />
        <Navbar position="top"/>
        <Banner title="Contact" background={background}/>
        <section className="contact">
            <div className="contactContent">

                <div className="contactBlock">
                    <h3 className="contactTitle">Contactez-nous !</h3>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p> */}
                    {/* <form className="contactForm" method="post" action="https://getform.io/f/ea07a596-28d9-41bc-9fab-8deeb55d027f"> */}
                    <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
                        <input type="hidden" name="bot-field" />
                        <input type="hidden" name="form-name" value="contact" />
                        <label className="contactFormLabel">
                            <input className="contactFormInput" type="text" name="name" placeholder="Nom"/>
                        </label>
                        <label className="contactFormLabel">
                            <input className="contactFormInput" type="text" name="surname" placeholder="Prénom"/>
                        </label>
                        <label className="contactFormLabel">
                            <input className="contactFormInput" type="email" name="email" placeholder="Email"/>
                        </label>
                        <label className="contactFormLabel">
                            <textarea className="contactFormInput" rows="10" name="message" placeholder="Votre message"></textarea>
                        </label>
                        <div className="contactFormCta">
                            <Button title="Envoyer" className="red" icon="true" submit="true"></Button>
                        </div>
                    </form>
                </div>
                <div className="contactBlock">
                    <div className="contactMap">
                    <img className="contactMapImg" src={mapImg}></img>
                    <h4>Coordonnées</h4>
                    <div className="contactInformation">
                        <p>
                        <FontAwesomeIcon className="contactInformationIcon" icon="comments" />
                        contact@margothillion.com
                        </p>
                        <p>
                        <FontAwesomeIcon className="contactInformationIcon" icon="phone" />
                        89 53 26 28
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </section>
        {/* <SearchProjects
          projects={projects}
          localSearchItems={localSearchItems}
          navigate={navigate}
          location={location}
        /> */}
        <Footer />
        
      </Layout>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    backgroundImage: file (relativePath: { eq: "contact.jpg" }){
      relativePath
      childImageSharp {
          fluid (quality: 100){
          ...GatsbyImageSharpFluid
          }
      }
    }
  }
`
