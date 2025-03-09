import React from 'react'
import '../OrderCard/OrderCard.css'

const OrderCard = ({ ordernum, orderstatus }) => {
	return (
		<>
			<div className='order-card d-flex flex-column justify-content-center mb-5'>
				<p className='order-num'>{ordernum}</p>
				<p className='order-status'>{orderstatus}</p>
			</div>
		</>
	)
}

export default OrderCard
