import React from 'react'
import '../menu-item-card/menu-item-card.css'
import noImage from '../../assets/images/no_image.png'
import addIcon from '../../assets/images/plus.svg'

const MenuItemCard = ({ name, price, description }) => {
	return (
		<div className='col-lg-3 col-md-4 col-sm-6'>
			<div className='content'>
				<img className='image user-select-none' src={noImage} alt='...' />
				<div className='top'>
					<p className='name'>{name}</p>
					<p className='description'>{description}</p>
				</div>
				<div className='bottom d-flex justify-content-between align-items-center'>
					<p className='price'>{price} ₽</p>
					<button className='add-btn'>
						<img
							className='add-btn-img user-select-none'
							src={addIcon}
							alt='...'
						/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default MenuItemCard
