import React, { useState } from 'react';
import Conditions from "../Conditions/Conditions";
import classes from './Forecast.module.css'

const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    
    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);
        fetch(`https://rapidapi.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "0cc47e5826msh59e8e51e3e6abafp161c4fjsnc614402a562f"
	}
        })    
            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response)
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            })
            
    }

return (
    <div>
        <h2>Find Current Weather Conditions</h2>
        <form onSubmit={getForecast}>
            <input 
                type="text"
                placeholder="Enter city"
                maxLength="50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={classes.input}
            />
            <label className={classes.radio}>
                <input 
                    type="radio"
                    name="units"
                    checked={unit === 'imperial'}
                    value="imperial"
                    onChange={(e) => {setUnit(e.target.value)}}
                /> 
                Fahrenheit
            </label>
            <label className={classes.radio}>
                <input 
                    type="radio"
                    name="units"
                    checked={unit === 'metric'}
                    value="metric"
                    onChange={(e) => {setUnit(e.target.value)}}
                /> 
                Celcius
            </label>
            <button type='submit' className={classes.button}>Get Forecast</button>
        </form>
        <Conditions 
            responseObj={responseObj} 
            error = {error}
            loading = {loading}
        />
    </div>
)
}

export default Forecast;