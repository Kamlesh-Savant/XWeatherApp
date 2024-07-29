import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

function Weather() {


    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    const searchRef = useRef();

    const fetchData = async ()=>{
        try {

            setIsLoading(true);
            const city = searchRef.current.value;
            const api_key = '5c56b5f08dd341a1bfc110531243005';

            let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`);
            let res = await response.json();
            setData(res);
            setIsLoading(false);
            // console.log(res);
            if(res.error){
                alert("Failed to fetch weather data");
            }

        } catch (error) {
            console.error(error)
        }
    }
    

    const Card = ({name,value})=>{

        return <div className="weather-card">
            <h3>{name}</h3>
            <p>{value}</p>
        </div>
    }

  return (
    <div className="container">
      <div className="search">
        <input type="text" placeholder="Enter city name" ref={searchRef}/>
        <button onClick={fetchData}>Search</button>
      </div>
      {data.current  ? <div className="weather-cards">
            <Card name="Temperature" value={<>{data.current.temp_c} <span>&#8451;</span></>}/>
            <Card name="Humidity" value={`${data.current.humidity}%`}/>
            <Card name="Condition" value={data.current.condition.text}/>
            <Card name="Wind Speed" value={`${data.current.wind_kph} kph`}/>
      </div> : (isLoading && <p>Loading data...</p>)}
    </div>
  );
}

export default Weather;
