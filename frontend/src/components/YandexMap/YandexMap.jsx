import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

const YandexMap = () => {
	return (
		<YMaps>
			<Map
				defaultState={{ center: [46.86045, 35.3799], zoom: 18 }}
				width='100%'
				height='400px'
				options={{
					suppressMapOpenBlock: true,
					suppressObsoleteBrowserNotifier: true,
					yandexMapDisablePoiInteractivity: true,
				}}
			>
				<Placemark
					geometry={[46.86045, 35.3799]}
					options={{
						iconLayout: 'default#image', // Используем кастомную картинку
						iconImageHref:
							'https://cdn-icons-png.flaticon.com/512/2776/2776067.png', // Ссылка на иконку
						iconImageSize: [40, 40], // Размер иконки
						iconImageOffset: [-20, -20], // Смещение, чтобы центр иконки был на точке
					}}
				/>
			</Map>
		</YMaps>
	)
}

export default YandexMap
