import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<>
		<Header />
		<App />
		<Footer />
	</>
)
