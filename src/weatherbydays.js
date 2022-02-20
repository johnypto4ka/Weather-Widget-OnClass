import {
	fetchDataPromise
} from './index.js'

class WeatherByDays {
	key = '61b15b0c0f1865015720e4bc6c0b7d55'
	urlWeatherByDays = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${this.key}`
	widgetBodyElement = document.querySelector('.widget-body')

	constructor() {
		this.init()
	}
	init() {
		this.createBody()
		this.transformMonth()
		this.transformDate()
	}
	widgetBodyTemplate(weatherData) {
		const {
			date,
			iconSrc,
			temp
		} = weatherData
		console.log(date)
		return `
		<div class="widget-item">
			<div class="item-text">${date.getDate()} ${this.transformMonth(date.getMonth())} 
			${this.transformDate(date.getHours())}:${this.transformDate(date.getMinutes())}</div>
			<img class="item-image"src="${iconSrc}" alt="">
			<div class="item-text">${temp}°C</div>
		</div>
	`
	}

	transformMonth(index) {
		switch (index) {
			case (index = 0):
				return 'Января'
			case (index = 1):
				return 'Февраля'
			case (index = 2):
				return 'Марта'
			case (index = 3):
				return 'Апреля'
			case (index = 4):
				return 'Мая'
			case (index = 5):
				return 'Июня'
			case (index = 6):
				return 'Июля'
			case (index = 7):
				return 'Августа'
			case (index = 8):
				return 'Сентября'
			case (index = 9):
				return 'Октября'
			case (index = 10):
				return 'Ноября'
			case (index = 11):
				return 'Декабря'
		}
	}

	transformDate(date) {
		return date < 10 ? `0${date}` : date
	}

	renderBody(data) {
		this.widgetBodyElement.innerHTML += this.widgetBodyTemplate(data)
	}

	createBody() {
		fetchDataPromise(this.urlWeatherByDays)
			.then((response) => {
				const data = JSON.parse(response)

				data.list.forEach((item, index) => {
					const date = new Date(item.dt * 1000)
					const iconSrc = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
					const temp = Math.round(item.main.temp - 273.15)
					if (index % 8 == 0) {
						console.log(item)
						this.renderBody({
							date,
							iconSrc,
							temp
						})
					}
				})
			})
	}
}

export {
	WeatherByDays
}