import React from 'react'
import '../OrderCard/OrderCard.css'

const OrderCard = ({
	order_num,
	order_status,
	order,
	status_id,
	order_price,
	id,
}) => {
	const color = `color${status_id}`

	// Функция для обработки клика по статусу
	const handleStatusClick = async () => {
		const confirmChange = window.confirm(
			'Вы точно хотите сменить статус заказа?'
		)

		if (confirmChange) {
			try {
				// Отправляем PUT запрос на сервер для обновления статуса
				const response = await fetch(`/edit_order_status/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (response.ok) {
					const data = await response.json()
					// Перезагружаем страницу после успешного изменения статуса
					window.location.reload()
				} else {
					alert('Ошибка при изменении статуса')
				}
			} catch (error) {
				console.error('Ошибка:', error)
				alert('Ошибка при соединении с сервером')
			}
		} else {
			alert('Изменение статуса отменено')
		}
	}

	return (
		<>
			<div className='col-lg-3 col-md-4 col-sm-6'>
				<div
					className='order-card d-flex flex-column mb-5'
					id={status_id === 0 ? 'on' : 'off'}
				>
					<div className='top-order-card d-flex align-items-center'>
						<p className='order-num'>№ {order_num}</p>
						<p
							className='order-status user-select-none'
							id={color}
							onClick={handleStatusClick} // Добавляем обработчик клика
						>
							{order_status}
						</p>
					</div>
					<p className='order'>{order}</p>
					<p className='order-price'>{order_price}</p>
				</div>
			</div>
		</>
	)
}

export default OrderCard
