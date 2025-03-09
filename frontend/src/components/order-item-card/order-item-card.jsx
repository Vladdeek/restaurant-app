import React from 'react'
import '../order-item-card/order-item-card.css'

const OrderItemCard = ({ name, price, image, btnIcon, btnFunc }) => {
	return (
		<>
			<div className='order-item-card d-flex justify-content-between align-items-center'>
				<img
					className='oic-image user-select-none'
					src={`${image}`}
					alt='...'
				/>
				<div className='oic-text-con d-flex flex-column text-center'>
					<p className='oic-name'>{name}</p>
					<p className='oic-price'>{price} ₽</p>
				</div>
				<button className='add-btn'>
					<img
						className='add-btn-img user-select-none'
						src={btnIcon}
						alt='...'
						onClick={btnFunc}
					/>
				</button>
			</div>
		</>
	)
}

export default OrderItemCard
