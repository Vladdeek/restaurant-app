import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../header/header.css'

const Header = ({ headerIcon, quantity }) => {
	const location = useLocation() // Получаем текущий путь

	const isCartPage = location.pathname === '/cart' // Проверяем, находимся ли мы на странице '/cart'

	return (
		<header className='header d-flex justify-content-between align-items-center user-select-none'>
			{isCartPage ? (
				<>
					<Link to='/menu'>
						<img className='header-btn' src={headerIcon} alt='' />
					</Link>
					<Link to='/'>
						<p className='logo text-uppercase'>tunaki</p>
					</Link>
				</>
			) : (
				<>
					<Link to='/'>
						<p className='logo text-uppercase'>tunaki</p>
					</Link>

					<Link to='/cart'>
						<img className='header-btn' src={headerIcon} alt='' />
						{/* Показываем количество товаров в корзине */}
						{quantity > 0 && <span className='cart-quantity'>{quantity}</span>}
					</Link>
				</>
			)}
		</header>
	)
}

export default Header
