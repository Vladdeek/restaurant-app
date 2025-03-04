import React from 'react'
import '../carousel-item-card/carousel-item-card.css'
import addIcon from '../../assets/images/plus.svg'
import BrushStroke from '../../assets/images/grunge-brush-stroke.png'

const CarouselItemCard = ({ name, price, image }) => {
	return (
		<div className='card-con'>
			<div className='bg-card'>
				<button className='cic-add-btn'>Добавить</button>
				<img
					className='cic-image user-select-none'
					src={`${image}`}
					alt='...'
				/>
				<div className='cic-bottom d-flex'>
					<p className='cic-name'>{name}</p>
					<div className='cic-price-con'>
						<img className='cic-BrushStroke' src={BrushStroke} alt='...' />
						<p className='cic-price'>{price} ₽</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CarouselItemCard
