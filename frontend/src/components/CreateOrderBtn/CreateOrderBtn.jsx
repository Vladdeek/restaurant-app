import React, { useState } from 'react'

const CreateOrderBtn = ({}) => {
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

			const totalPrice = Math.floor(dataPrice.total_price) // Если сервер возвращает цену как строку, можно преобразовать в целое число

			// Создание заказа
			const orderData = {
				order_num: 0,
				status_id: 0, // Статус заказа (например, 0 - новый)
				orders: JSON.stringify(cartItemsArray), // Массив товаров в виде строки
				total_price: totalPrice, // Цена из запроса, передается как целое число
			}
			console.log(orderData)

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

			// Если заказ создан успешно, можно вывести сообщение или редирект
			console.log(`Заказ успешно создан! Номер заказа: ${dataOrder.order_num}`)
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
			console.log('Произошла ошибка при создании заказа')
		}
	}

	return (
		<button className='create-order-btn' onClick={handleCreateOrder}>
			Заказать
		</button>
	)
}

export default CreateOrderBtn
