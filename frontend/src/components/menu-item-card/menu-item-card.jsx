import React from 'react'
import '../menu-item-card/menu-item-card.css'
import BrushStroke from '../../assets/images/grunge-brush-stroke.png'

const MenuItemCard = ({ name, price, image, btnIcon, btnFunc }) => {
	return (
		<div className='col-lg-3 col-md-4 col-sm-6'>
			<div className='content'>
				<img className='image user-select-none' src={`${image}`} alt='...' />
				<div className='top'>
					<p className='name'>{name}</p>
				</div>
				<div className='bottom d-flex justify-content-between align-items-center'>
					<div className='price-con'>
						<img className='BrushStroke' src={BrushStroke} alt='...' />
						<p className='price'>{price} ₽</p>
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
			</div>
		</div>
	)
}

export default MenuItemCard
