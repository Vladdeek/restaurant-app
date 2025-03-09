import React from 'react'
import { Link } from 'react-router-dom'
import '../CreateOrderBtn/CreateOrderBtn.css'

const CreateOrderBtn = () => {
	const handleCreateOrder = async () => {
		try {
			// Извлекаем массив товаров из localStorage
			const cartItems = localStorage.getItem('cartItems')
			const cartItemsArray = cartItems ? JSON.parse(cartItems) : []

			if (cartItemsArray.length === 0) {
				alert('Корзина пуста')
				return
			}

			// Запрашиваем цену заказа
			const responsePrice = await fetch(
				`/get_order_price/${encodeURIComponent(JSON.stringify(cartItemsArray))}`
			)
			const dataPrice = await responsePrice.json()

			if (!responsePrice.ok) {
				alert('Ошибка получения цены заказа')
				return
			}

			const totalPrice = Math.floor(dataPrice.total_price) // Округляем цену до целого

			// Создание заказа
			const orderData = {
				order_num: 0,
				status_id: 0, // Статус заказа (например, 0 - новый)
				orders: JSON.stringify(cartItemsArray),
				total_price: totalPrice,
			}

			const responseOrder = await fetch('/post_order/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			})

			const dataOrder = await responseOrder.json()

			if (!responseOrder.ok) {
				console.log('Ошибка при создании заказа')
				return
			}

			// Очистка корзины после успешного создания заказа
			localStorage.removeItem('cartItems')

			// Уведомление пользователя
			alert(`Заказ успешно создан! Номер заказа: ${dataOrder.order_num}`)
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
			console.log('Произошла ошибка при создании заказа')
		}
	}

	return (
		<Link className='create-order-btn' to='/' onClick={handleCreateOrder}>
			Заказать
		</Link>
	)
}

export default CreateOrderBtn
