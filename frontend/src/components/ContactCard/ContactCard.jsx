import React from 'react'
import '../ContactCard/ContactCard.css'

const ContactCard = ({ ccimage, cctext, ccurl }) => {
	return (
		<>
			<div className='contact-card col-6 d-flex align-items-center m-5'>
				<img className='cc-image' src={ccimage} alt='' />
				<a className='cc-text' href={ccurl}>
					{cctext}
				</a>
			</div>
		</>
	)
}

export default ContactCard
