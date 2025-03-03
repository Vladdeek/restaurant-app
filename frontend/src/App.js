import React, { useState, useEffect } from 'react'
import MenuItemCard from './components/menu-item-card/menu-item-card'

const App = () => {
	const [menu, setMenu] = useState([])
	// Функция для загрузки задач из FastAPI
	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await fetch(`http://localhost:8000/get_menu/`)
				const menuList = await response.json()

				// Обновляем состояние tasks
				setMenu(
					menuList.map(menu => ({
						title: menu.title,
						description: menu.description,
						price: menu.price,
						image_path: menu.image_path,
						id: menu.id,
					}))
				)
			} catch (error) {
				console.error('Ошибка загрузки задач:', error)
			}
		}

		fetchMenu()
	}, []) // [] означает, что эффект сработает только при первом рендере
	return (
		<>
			<div className='row'>
				{menu.map((menu, index) => (
					<MenuItemCard
						key={index}
						price={menu.price}
						name={menu.title}
						description={menu.description}
					/>
				))}
			</div>
		</>
	)
}

export default App
