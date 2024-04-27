import { useEffect, useState } from 'react'
import './App.css'
import axios, { AxiosResponse } from 'axios'
import { WeatherRequestResponse } from './types/WeatherRequests';

const token = "e05f10347f584d3bade00436243103";

 function App() {
  const [weatherData,setWeatherData] = useState<AxiosResponse | null>(null);
  useEffect(() => {
    fetchDataApi('London')
  }, []);
  const fetchDataApi = (CityName:string) => {
    axios.get<WeatherRequestResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${CityName}`)
    .then ((response)=>{
      return setWeatherData(response);
    })
  };
  return (
    <div>
      {weatherData && (
        <div>
          <h2> City: {weatherData.data.location.name}</h2>
          <p>Temperature is: {weatherData.data.current.temp_c}</p>
        </div>
      )}
    </div>
  );
};

export default App;
