import { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
	const URL = 'https://api.openweathermap.org/data/2.5/weather';
	const apiKey = '5351f2146f468051fdd89e9ac4693cec';
	const difKelvin = 273.15;

	const [weatherData, setWeatherData] = useState(null);
	const [city, setCity] = useState('');

	const fetchWeather = async () => {
		try {
			const res = await fetch(`${URL}?q=${city}&appid=${apiKey}`);
			const data = await res.json();
			setWeatherData(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCity = event => {
		setCity(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		fetchWeather();
	};

	return (
		<div className='general'>
			<div className='container'>
				<h1>Weather App</h1>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={city}
						onChange={handleCity}
						placeholder='Search City'
					/>
					<button type='submit'>Search</button>
				</form>
				{weatherData && (
					<div>
						<h2>{weatherData.name}</h2>
						<p>Temperature: {parseInt(weatherData.main?.temp - difKelvin)}C°</p>
						<p>condition: {weatherData.weather[0].description}</p>
						<img
							src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
							alt='Weather Icon'
						/>
						<p>Feels like: {weatherData.main.feels_like}</p>
						<p>Humidity: {weatherData.main.humidity}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherApp;
