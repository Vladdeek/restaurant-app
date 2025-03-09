import React, { useState, useEffect } from 'react'
import MenuItemCard from '../components/menu-item-card/menu-item-card'
import noImage from '../assets/images/no_image.png'
import Search from '../components/search/search'
import Header from '../components/header/header'

const Menu = () => {
	const [search, setSearch] = useState('')
	const [menu, setMenu] = useState([])

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const url =
					search.length > 0 ? `/search_menu/?query=${search}` : `/get_menu/`

				const response = await fetch(url)
				const menuList = await response.json()

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
	}, [search])

	return (
		<>
			<Header />
			<Search value={search} onChange={e => setSearch(e.target.value)} />
			<div className='container'>
				<div className='row '>
					{menu.map((menu, index) => (
						<MenuItemCard
							key={index}
							price={menu.price}
							name={menu.title}
							image={menu.image_path}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Menu
