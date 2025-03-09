import React, { useState, useEffect } from 'react'
import OrderCard from '../components/OrderCard/OrderCard'

const DoneOrders = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		// Меняем background-color на white, когда компонент монтируется
		document.body.style.backgroundColor = 'white'

		// Чистим стиль, когда компонент размонтируется (если нужно вернуть стандартный цвет)
		return () => {
			document.body.style.backgroundColor = ''
		}
	}, [])

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch('/get_done_orders/')
				const orderList = await response.json()

				// Преобразуем заказы: парсим order.orders и подгружаем названия блюд
				const updatedOrders = await Promise.all(
					orderList.map(async order => {
						const menuTitles = await fetchOrderList(order.orders) // Получаем названия блюд

						return {
							order_num: order.order_num,
							order: menuTitles.join(', '), // Объединяем в строку через запятую
							order_status:
								order.status_id === 3 ? 'Заказ отдан' : 'Неизвестный статус',
							status_id: order.status_id, // передаем корректно
							id: order.id,
						}
					})
				)

				setOrders(updatedOrders)
			} catch (error) {
				console.error('Ошибка загрузки заказов:', error)
			}
		}

		fetchOrders()
	}, [])

	// Функция для запроса названий блюд по ID
	const fetchOrderList = async orderString => {
		try {
			const orderIds = JSON.parse(orderString) // Превращаем строку "[1, 2, 4]" в массив [1, 2, 4]
			const menuTitles = await Promise.all(
				orderIds.map(async id => {
					const response = await fetch(`/get_menu/${id}`)
					const menuItem = await response.json()
					return menuItem.title // Берём только название блюда
				})
			)
			return menuTitles
		} catch (error) {
			console.error('Ошибка загрузки меню:', error)
			return ['Ошибка загрузки']
		}
	}

	return (
		<>
			<div className='container'>
				<div className='row '>
					{orders.map((order, index) => (
						<OrderCard
							key={index}
							order_num={order.order_num}
							order={order.order} // Здесь уже названия блюд
							order_status={order.order_status}
							status_id={order.status_id}
							id={order.id}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default DoneOrders
