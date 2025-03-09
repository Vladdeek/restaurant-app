import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './pages/Menu'
import Main from './pages/Main'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import DoneOrders from './pages/DoneOrders'
import Check from './pages/check'
import Footer from './components/footer/footer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Router>
		<Routes>
			{/* Главная страница */}
			<Route path='/' element={<Main />} />

			{/* Страница меню */}
			<Route path='/menu' element={<Menu />} />

			{/* Страница корзины */}
			<Route path='/cart' element={<Cart />} />

			{/* Страница заказов */}
			<Route path='/orders' element={<Orders />} />

			{/* Страница готовых заказов */}
			<Route path='/done-orders' element={<DoneOrders />} />

			{/* Страница чека */}
			<Route path='/check' element={<Check />} />
		</Routes>
		<Footer />
	</Router>
)
