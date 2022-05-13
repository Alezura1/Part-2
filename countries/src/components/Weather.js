const Weather = ({ capital, weather }) => {

    if (weather) {    
    const getWeatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    const windSpeed = (Math.round(weather.wind.speed * 100) / 100).toFixed(2)
   
    return (
    <div>
        <h3>Weather in {capital}</h3>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={getWeatherIcon} alt='WeatherIcon'/>
        <p>wind {windSpeed} m/s</p>
    </div>
  )}

  
}


export default Weather