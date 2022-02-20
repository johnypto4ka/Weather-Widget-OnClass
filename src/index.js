import { WeatherCurrent } from './weathercurrent.js'
import { WeatherByDays } from './weatherbydays.js'
export {fetchDataPromise}

function fetchDataPromise (url, method = 'GET') {
	return new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()
  
	xhr.open(method, url)

	xhr.onload = () => {
		if (xhr.status == '200') {
			resolve(xhr.response)
		} else {
			reject(xhr.status + ' ' + xhr.statusText)
		}
	}
  
	xhr.onerror = () => {
		reject(xhr.status + ' ' + xhr.statusText)
	}
  
	xhr.send()
	})
}

new WeatherCurrent()
new WeatherByDays()