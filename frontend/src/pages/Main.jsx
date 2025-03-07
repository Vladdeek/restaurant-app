import React, { useState, useEffect } from 'react'
import noImage from '../assets/images/orig.png'
import Carousel from '../components/Carousel/Carousel'
import '../styles/main.css'
import AuthBtn from '../components/AuthBtn/AuthBtn'

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
					<AuthBtn color='white' />
				</header>

				<div className='image-and-text d-flex'>
					<img
						className='png-element mirrored'
						src='png-element.png'
						alt='...'
					/>
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
				<p>About us section</p>
			</section>
			<section id='contacts'>
				<p>Contacts</p>
			</section>
		</>
	)
}

export default Main
