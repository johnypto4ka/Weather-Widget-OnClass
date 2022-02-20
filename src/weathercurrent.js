import {
	fetchDataPromise
} from './index.js'

class WeatherCurrent {
	key = '61b15b0c0f1865015720e4bc6c0b7d55'
	urlWeatherCurrent = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${this.key}`
	widgetHeaderElement = document.querySelector('.widget-header')

	constructor() {
		this.init()
	}

	init() {
		this.createHeader()
		this.transformDate()
		this.getDirection()
	}

	widgetHeaderTemplate(weatherData) {
		const {
			city,
			windDirection,
			windSpeed,
			date,
			temp,
			countryCode,
			description,
			iconSrc
		} = weatherData
		const resultTemp = Math.round(temp) > 0 ? '+' + Math.round(temp) : Math.round(temp)

		return `
	<div class="widget-top">
		<div class="widget-geo">${city}, ${countryCode}</div>
		<div class="widget-time"> 
			<div class="time-icon"><img src="../icons/clock-regular.svg" alt=""></div>
			<p>${this.transformDate(date.getHours())}:${this.transformDate(date.getMinutes())}</p>
		</div>
	</div>
	<div class="widget-center">
		<img src="${iconSrc}" alt="">
		<h2>${resultTemp}</h2>
		<div class="widget-descr">${description}</div>
	</div>
	<div class="widget-wind">
		<div>${windDirection}</div>
		<div>${windSpeed} м/с</div>
	</div>
	`
	}

	transformDate(date) {
		return date < 10 ? `0${date}` : date
	}

	renderHeader(data) {
		this.widgetHeaderElement.innerHTML += this.widgetHeaderTemplate(data)
	}

	getDirection(value) {
		console.log(value)

		switch (true) {
			case (value > 337.5 || value < 22.5):
				return 'Север'
			case (value > 22.5 && value < 67.5):
				return 'Северо-восток'
			case (value > 67.5 && value < 112.5):
				return 'Восток'
			case (value > 112.5 && value < 157.5):
				return 'Юго-восток'
			case (value > 157.5 && value < 202.5):
				return 'Юг'
			case (value > 202.5 && value < 247.5):
				return 'Юго-запад'
			case (value > 247.5 && value < 292.5):
				return 'Запад'
			case (value > 292.5 && value < 337.5):
				return 'Северо-запад'
		}
	}

	createHeader() {
		fetchDataPromise(this.urlWeatherCurrent)
			.then((response) => {
				const data = JSON.parse(response)
				console.log(data)
				const city = data.name
				const windDirection = this.getDirection(data.wind.deg)
				const windSpeed = data.wind.speed
				const date = new Date(data.dt * 1000)
				const temp = data.main.temp - 273.15
				const countryCode = data.sys.country
				const description = data.weather[0].description
				const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
				this.renderHeader({
					city,
					windDirection,
					windSpeed,
					date,
					temp,
					countryCode,
					description,
					iconSrc
				})
			})
	}
}

export {
	WeatherCurrent
}