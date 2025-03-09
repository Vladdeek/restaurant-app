import React, { useState, useEffect } from 'react'
import MenuItemCard from '../components/menu-item-card/menu-item-card'
import noImage from '../assets/images/no_image.png'
import addIcon from '../assets/images/plus.svg'
import headerIcon from '../assets/images/cart-shopping-svgrepo-com.svg'
import Search from '../components/search/search'
import Header from '../components/header/header'

const Menu = () => {
	const [search, setSearch] = useState('')
	const [menu, setMenu] = useState([])
	const [cartItemsCount, setCartItemsCount] = useState({})

	useEffect(() => {
		// Загружаем меню
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

	useEffect(() => {
		// Загружаем товары из localStorage и считаем их количество
		const currentCart = JSON.parse(localStorage.getItem('cartItems')) || []
		const countMap = {}

		// Подсчитываем количество каждого товара в корзине
		currentCart.forEach(id => {
			countMap[id] = countMap[id] ? countMap[id] + 1 : 1
		})

		setCartItemsCount(countMap)
	}, [])

	// Функция для добавления товара в localStorage
	const handleAddToCart = id => {
		// Получаем текущие товары из localStorage, если их нет, то создаем новый массив
		const currentCart = JSON.parse(localStorage.getItem('cartItems')) || []

		// Добавляем новый товар в корзину
		currentCart.push(id)

		// Сохраняем обновленную корзину обратно в localStorage
		localStorage.setItem('cartItems', JSON.stringify(currentCart))

		// Обновляем количество товаров в корзине
		setCartItemsCount(prevCount => ({
			...prevCount,
			[id]: (prevCount[id] || 0) + 1,
		}))

		alert('Товар добавлен в корзину!')
	}

	// Получаем общее количество товаров в корзине
	const totalQuantity = Object.values(cartItemsCount).reduce(
		(acc, quantity) => acc + quantity,
		0
	)

	return (
		<>
			<Header headerIcon={headerIcon} quantity={totalQuantity} />{' '}
			{/* Передаем общее количество */}
			<Search value={search} onChange={e => setSearch(e.target.value)} />
			<div className='container'>
				<div className='row'>
					{menu.map(menuItem => (
						<MenuItemCard
							key={menuItem.id}
							price={menuItem.price}
							name={menuItem.title}
							image={menuItem.image_path}
							btnIcon={addIcon}
							btnFunc={() => handleAddToCart(menuItem.id)} // Передаем id товара в функцию
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Menu
