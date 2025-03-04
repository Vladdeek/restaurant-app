import 'bootstrap/dist/css/bootstrap.min.css'
import CarouselItemCard from '../carousel-item-card/carousel-item-card'
import '../Carousel/Carousel.css'

const Carousel = ({ items }) => {
	return (
		<div className='carousel d-flex overflow-auto gap-3 p-3'>
			{items.map(item => (
				<CarouselItemCard
					name={item.title}
					price={item.price}
					image={item.image_path}
				/>
			))}
		</div>
	)
}

export default Carousel
