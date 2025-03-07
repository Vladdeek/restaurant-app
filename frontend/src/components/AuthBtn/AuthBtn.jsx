import React from 'react'
import '../AuthBtn/AuthBtn.css'

const AuthBtn = ({ color = 'white' }) => {
	return (
		<>
			<p className='auth-btn' style={{ color }}>
				Войти
			</p>
		</>
	)
}

export default AuthBtn
