import React from 'react'
import '../AboutUsCard/AboutUsCard.css'

const AboutUsCard = ({ autitle, autext }) => {
	return (
		<>
			<div className='about-us-card d-flex flex-column justify-content-center mb-5'>
				<p className='about-us-title'>{autitle}</p>
				<p className='about-us-text'>{autext}</p>
			</div>
		</>
	)
}

export default AboutUsCard
