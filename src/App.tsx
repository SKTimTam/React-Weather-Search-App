import { useState } from 'react'
import './App.css'
import axios, { AxiosResponse } from 'axios'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const token = "e05f10347f584d3bade00436243103";

 function App() {

  const [weatherData,setWeatherData] = useState<AxiosResponse | null>(null);
  const [city, setCity] = useState('');



  const fetchDataApi = () => {
    axios.get<WeatherRequestResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${city}`)
    .then ((response)=>{
      return setWeatherData(response);
    })
  };
  
  return (
    <div className="grid-container">
      <div className="grid-item">
        <Input type="string" placeholder="City Name" onChange={(e)=>setCity(e.target.value)}/>
      </div>
      <div className="grid-item">
        <Button type="submit" onClick={fetchDataApi}>Search</Button>
      </div>
        {weatherData && (
          <Card>
            <CardHeader>
              <CardTitle> City: {weatherData.data.location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Temperature is: {weatherData.data.current.temp_c} Celsius</p>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default App;
