import React, { useState, useEffect } from 'react'
import noImage from '../assets/images/orig.png'
import Carousel from '../components/Carousel/Carousel'
import AboutUsCard from '../components/AboutUsCard/AboutUsCard'
import '../styles/main.css'

const rollIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // ID роллов

const Main = () => {
	const [menu, setMenu] = useState([])

	useEffect(() => {
		const fetchRolls = async () => {
			let newMenu = []

			for (let i = 0; i < rollIds.length; i++) {
				try {
					const response = await fetch(`/get_menu/${rollIds[i]}`)
					const menuItem = await response.json()

					newMenu.push({
						title: menuItem.title,
						price: menuItem.price,
						image_path: menuItem.image_path
							? `/menu/${menuItem.image_path}`
							: noImage,
						id: menuItem.id,
					})

					setMenu([...newMenu]) // Обновляем состояние

					// Делаем паузу перед следующим роллом
					await new Promise(resolve => setTimeout(resolve, 250))
				} catch (error) {
					console.error(`Ошибка при загрузке ролла ${rollIds[i]}:`, error)
				}
			}
		}

		fetchRolls()
	}, [])

	return (
		<>
			<section id='main'>
				<header className='links-header d-flex justify-content-end align-items-center user-select-none'>
					<a href='#main'>Главная</a>
					<a href='#about-us'>О нас</a>
					<a href='#contacts'>Контакты</a>
					<a href=''>Меню</a>
				</header>

				<div className='image-and-text d-flex'>
					<img className='png-element1' src='png-element1.png' alt='...' />
					<div className='main-text-con user-select-none d-flex flex-column justify-content-center align-items-center'>
						<h1 className='text-center text-uppercase'>Tunaki</h1>
						<h2 className='text-center text-uppercase'>
							океан удовольствия в каждом кусочке
						</h2>
						<h3 className='text-center'>
							Свежие ингредиенты, мастерство шефов и настоящий вкус Японии – всё
							это ждёт тебя в TUNAKI. Почувствуй гармонию в каждом ролле и
							наслаждайся моментом! 🍣🥢
						</h3>
					</div>
				</div>

				<Carousel items={menu} />
			</section>
			<section id='about-us'>
				<div className='d-flex flex-column align-items-center'>
					<p className='title text-center'>О нас</p>
					<p className='text-au text-center col-lg-8 col-md-10 col-sm-12'>
						Tunaki — это ролльная, где каждый заказ — это не только вкусно, но и
						быстро. Мы готовим роллы с любовью и вниманием к деталям, чтобы вы
						могли наслаждаться идеальным вкусом.
					</p>
				</div>
				<div className='container d-flex mt-5'>
					<div className='col-4 d-flex flex-column'>
						<AboutUsCard
							autitle='Свежие ингредиенты'
							autext='Только свежие продукты для идеального вкуса и качества.'
						/>
						<AboutUsCard
							autitle='Быстрая доставка'
							autext='Минимальное время ожидания, чтобы вы могли насладиться роллами быстро.'
						/>
						<AboutUsCard
							autitle='Разнообразие роллов'
							autext='Для любого вкуса — от классики до уникальных авторских сочетаний.'
						/>
					</div>
					<div className='col-4 d-flex justify-content-center align-items-center '>
						<img className='png-element2' src='png-element2.png' alt='' />
					</div>
					<div className='col-4 d-flex flex-column'>
						<AboutUsCard
							autitle='Удобный самовывоз'
							autext='Забери заказ в любое время — без лишних ожиданий и проблем.'
						/>
						<AboutUsCard
							autitle='Традиционные рецепты'
							autext='Японская кухня с современными акцентами для уникальных сочетаний.'
						/>
						<AboutUsCard
							autitle='Доступные цены'
							autext='Качественные роллы по разумной цене, наслаждайтесь без переплат.'
						/>
					</div>
				</div>
			</section>
			<section id='contacts'>
				<p className='title text-center'>Контакты</p>
			</section>
		</>
	)
}

export default Main
