import React from 'react'
import '../header/header.css'
import AuthBtn from '../AuthBtn/AuthBtn'

const Header = ({}) => {
	return (
		<header className='header d-flex justify-content-between align-items-center user-select-none'>
			<p className='logo text-uppercase'>tunaki</p>
			<AuthBtn color='white' />
		</header>
	)
}

export default Header
