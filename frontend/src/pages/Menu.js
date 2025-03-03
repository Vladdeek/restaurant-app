import React, { useState, useEffect } from 'react'
import MenuItemCard from '../components/menu-item-card/menu-item-card'
import noImage from '../assets/images/no_image.png'

const Menu = () => {
	const [menu, setMenu] = useState([])

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await fetch(`http://localhost:8000/get_menu/`)
				const menuList = await response.json()

				// Обновляем состояние menu
				setMenu(
					menuList.map(menu => ({
						title: menu.title,
						price: menu.price,
						image_path: menu.image_path ? `/menu/${menu.image_path}` : noImage,
						id: menu.id,
					}))
				)
			} catch (error) {
				console.error('Ошибка загрузки меню:', error)
			}
		}

		fetchMenu()
	}, [])

	return (
		<>
			<div className='row'>
				{menu.map((menu, index) => (
					<MenuItemCard
						key={index}
						price={menu.price}
						name={menu.title}
						image={menu.image_path}
					/>
				))}
			</div>
		</>
	)
}

export default Menu
