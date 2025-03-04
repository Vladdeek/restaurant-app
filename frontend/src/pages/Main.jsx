import React, { useState, useEffect } from 'react'
import MenuItemCard from '../components/menu-item-card/menu-item-card'
import noImage from '../assets/images/orig.png'
import Carousel from '../components/Carousel/Carousel'

const Main = () => {
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
			<img className='png-element mirrored' src='png-element.png' alt='...' />
			<Carousel items={menu} />
		</>
	)
}

export default Main
