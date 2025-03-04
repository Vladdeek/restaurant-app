import React from 'react'
import '../carousel-item-card/carousel-item-card.css'
import addIcon from '../../assets/images/plus.svg'
import BrushStroke from '../../assets/images/grunge-brush-stroke.png'

const CarouselItemCard = ({ name, price, image }) => {
	return (
		<div className='card-container'>
			<div className='background-card'></div>
			<div className='top'>
				<button className='add-btn'>
					<img
						className='add-btn-img user-select-none'
						src={addIcon}
						alt='...'
					/>
				</button>
				<img className='image user-select-none' src={`${image}`} alt='...' />
			</div>
			<div className='bottom'>
				<p className='name'>{name}</p>
				<div className='price-con'>
					<img className='BrushStroke' src={BrushStroke} alt='...' />
					<p className='price'>{price} ₽</p>
				</div>
			</div>
		</div>
	)
}

export default CarouselItemCard
