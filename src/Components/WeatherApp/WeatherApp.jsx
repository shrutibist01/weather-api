import React, { useState } from 'react'; 
import './WeatherApp.css';
import cloudy from '../Assets/icons8-cloudy-90.png';
import drizzle from '../Assets/icons8-drizzle-90.png';
import humidityIcon from '../Assets/icons8-humidity-100.png'; 
import rain from '../Assets/icons8-rain-90.png';
import snowflake from '../Assets/icons8-snowflake-100.png';
import sunny from '../Assets/icons8-sunny-100.png';
import windIcon from '../Assets/icons8-wind-100.png'; 
import searchIcon from '../Assets/icons8-search-24.png';

const WeatherApp = () => {

    let apiKey = '2219995fa2e3ebfeb088343a87378086';
    const [wicon, setWicon] = useState(cloudy); 

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${apiKey}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = Math.floor(data.wind.speed )+ ' km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp) + '°C';
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(sunny);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloudy);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snowflake);
        }else {
            setWicon(sunny);
        }
    }

    return (
        <div className='container'>
            <div className='topbar'>
                <input type='text' className='cityInput' placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={searchIcon} alt='' />
                </div>
                <div>
                    <div className='weather-image'>
                        <img src={wicon} alt="" /> 
                    </div>
                    <div className='weather-temp'>24°C</div>
                    <div className='weather-location'>London</div>
                    <div className='data-container'>

                        <div className='element'>
                            <img src={humidityIcon} alt='' className='icon' /> 
                            <div className='data'>
                                <div className='humidity-percent'>64%</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>

                        <div className='element'>
                            <img src={windIcon} alt='' className='icon' /> 
                            <div className='data'>
                                <div className='wind-speed'>18 km/h</div>
                                <div className='text'>Wind Speed</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
