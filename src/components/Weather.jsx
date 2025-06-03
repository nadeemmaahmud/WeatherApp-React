import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import sun from '../assets/sun.png'
import search_icon from '../assets/search-icon.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'

function Weather() {
  const [weatherdata, setWeatherData] = useState(false)
  const inputRef = useRef(null)

  const getWeather = async (city) => {
    if(city === ""){
        setWeatherData(false)
        alert("Please enter a city name!")
        return
    }

    try{
        const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setWeatherData({
            humidity: data.current.humidity,
            wind: data.current.wind_kph,
            city: data.location.name,
            country: data.location.country,
            condition: data.current.condition.text,
            condition_icon: data.current.condition.icon,
            tempareture: data.current.temp_c,
            feels_like: data.current.feelslike_c,
        })
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    getWeather("Rajshahi")
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search for a city'/>
        <img onClick={() => {getWeather(inputRef.current.value)}} src={search_icon} alt='search'/>
      </div>

      {weatherdata? <>
        <img src={weatherdata.condition_icon} alt='condition' className='weather-icon'/>
        <p className='tempareture'>{weatherdata.tempareture}</p>
        <p className='location'>{weatherdata.city}, {weatherdata.country}</p>
        <p className='condition'>{weatherdata.condition}</p>
        <p className='feels-like'>Feels Like : {weatherdata.feels_like}</p>

        <div className='weather-data'>
            <div className='col'>
                <img src={humidity} alt=''/>
                <div>
                    <p>{weatherdata.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind} alt=''/>
                <div>
                    <p>{weatherdata.wind} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
      </> : <><p className='loading'>Loading......</p></>}
    </div>
  )
}

export default Weather
