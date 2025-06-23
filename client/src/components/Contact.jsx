import React from "react"
import ContactForm from "./ContactForm"
import SocialLinks from "./SocialLinks"

const Contact = () => (
    <section className="contact-me" id="link-to-contact">
        <div className="section-title">
            <h2>CONTACT ME</h2>
        </div>
        <div className='contact-layout'>
            <ContactForm />
            <SocialLinks />
        </div>
    </section>
)

export default Contact;