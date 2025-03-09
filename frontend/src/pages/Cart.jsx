import React, { useState, useEffect } from 'react'
import OrderItemCard from '../components/order-item-card/order-item-card'
import noImage from '../assets/images/no_image.png'
import delIcon from '../assets/images/del.svg'
import headerIcon from '../assets/images/back-svgrepo-com.svg'
import Header from '../components/header/header'
import CreateOrderBtn from '../components/CreateOrderBtn/CreateOrderBtn'
import '../styles/cart.css'

const Cart = () => {
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(null) // Состояние для хранения общей цены

	// Загружаем товары в корзину из localStorage
	useEffect(() => {
		const fetchCartItems = async () => {
			// Получаем массив id товаров из localStorage
			const storedItems = JSON.parse(localStorage.getItem('cartItems')) || []

			// Если массив пуст, ничего не делаем
			if (storedItems.length === 0) {
				return
			}

			try {
				// Массив запросов к серверу для получения данных о каждом товаре по id
				const responses = await Promise.all(
					storedItems.map(id => fetch(`/get_menu/${id}`)) // Запрос для каждого id
				)

				// Обрабатываем полученные ответы
				const menuItems = await Promise.all(
					responses.map(response => response.json())
				)

				// Обновляем состояние с товарами, которые были в корзине
				setCartItems(menuItems)
			} catch (error) {
				console.error('Ошибка загрузки товаров корзины:', error)
			}
		}

		fetchCartItems()
	}, [])

	// Функция для удаления товара из корзины
	const handleRemoveItem = id => {
		const updatedItems = cartItems.filter(item => item.id !== id)
		setCartItems(updatedItems)

		// Обновляем localStorage
		const storedItems = JSON.parse(localStorage.getItem('cartItems')) || []
		const updatedStoredItems = storedItems.filter(itemId => itemId !== id)
		localStorage.setItem('cartItems', JSON.stringify(updatedStoredItems))
	}

	// Функция для получения цены заказа
	useEffect(() => {
		const getPriceOrder = async () => {
			try {
				// Извлекаем массив товаров из localStorage и преобразуем его в строку
				const storedItems = localStorage.getItem('cartItems')
				const cartItemsString = storedItems ? storedItems : '[]' // Если нет товаров, передаем пустой массив

				const response = await fetch(
					`/get_order_price/${encodeURIComponent(cartItemsString)}`
				)

				// Проверяем, что запрос прошел успешно
				if (!response.ok) {
					throw new Error('Ошибка при получении цены заказа')
				}

				// Преобразуем ответ в JSON
				const data = await response.json()

				// Логируем весь ответ
				console.log('Ответ от сервера:', data)

				// Обрабатываем полученные данные и обновляем состояние с ценой
				if (data && data.total_price) {
					console.log('Цена заказа:', data.total_price)
					setTotalPrice(data.total_price) // Обновляем состояние с полученной ценой
				} else {
					console.log('Цена не получена или неправильно передана')
				}
			} catch (error) {
				console.error('Ошибка:', error)
			}
		}

		getPriceOrder()
	}, [cartItems])

	return (
		<>
			<Header headerIcon={headerIcon} />
			<div className='container'>
				<div className='row d-flex justify-content-center'>
					<div className='col-7'>
						{cartItems.length > 0 ? (
							cartItems.map(item => (
								<OrderItemCard
									key={item.id}
									price={item.price}
									name={item.title}
									image={item.image_path || noImage}
									btnIcon={delIcon}
									btnFunc={() => handleRemoveItem(item.id)} // Передаем id для удаления
								/>
							))
						) : (
							<p className='EmptyCart text-center'>Корзина пуста</p>
						)}

						{/* Блок с кнопкой и итоговой ценой, показываем только если в корзине есть товары */}
						{cartItems.length > 0 && (
							<div className='col-12 d-flex flex-column align-items-center'>
								{/* Показываем цену, если она загружена */}
								<p className='EmptyCart text-center'>{`${totalPrice} руб`}</p>
								<CreateOrderBtn />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Cart
