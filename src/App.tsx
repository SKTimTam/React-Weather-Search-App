import { useEffect, useState } from 'react'
import './App.css'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { getDataApi } from './services/DataAPI';


  function App() {

  const [weatherData,setWeatherData] = useState<WeatherRequestResponse>();
  const [city, setCity] = useState('');

  useEffect(()=>{
    localStorage.setItem('cities', JSON.stringify(city));
  },[city])
  
  console.log(localStorage)

  return (
    <>
      <div className="flex-container" style={{display: 'flex'}} >
        <Input className="w-[300px]" type="string" placeholder="City Name" onChange={(e)=>setCity(e.target.value)}/>
        <Button className="w-[50px]" type="submit" onClick={()=>getDataApi(city, setWeatherData)}>Search</Button>
      </div>
      <div className="flex-container" style={{display: 'flex', flexDirection: 'column'}} >
        <br></br>
          {weatherData ? (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle> City: {weatherData.location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Temperature is: {weatherData.current.temp_c} Celsius</p>
                <p>Local time is: {weatherData.location.localtime}</p>
                <p>Condition is : {weatherData.current.condition.text}</p>
                <p>Latitude is : {weatherData.location.lat}</p>
                <p>Longtitude is : {weatherData.location.lon}</p>
              </CardContent>
            </Card>
          ) : 
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle> Enter in a City Name please</CardTitle>
              </CardHeader>
              <CardContent>
                <p> Try your favourite City!</p>
              </CardContent>
            </Card>}
      </div>
    </>
  );
};

export default App;
