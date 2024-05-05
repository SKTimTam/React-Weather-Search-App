import { useState } from 'react'
import './App.css'
import axios, { AxiosResponse } from 'axios'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

  const token = process.env.REACT_APP_API_KEY;

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
    <>
      <div className="flex-container" style={{display: 'flex'}} >
        <Input className="w-[300px]" type="string" placeholder="City Name" onChange={(e)=>setCity(e.target.value)}/>
        <Button className="w-[50px]" type="submit" onClick={fetchDataApi}>Search</Button>
      </div>
      <div className="flex-container" style={{display: 'flex', flexDirection: 'column'}} >
          {weatherData ? (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle> City: {weatherData.data.location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Temperature is: {weatherData.data.current.temp_c} Celsius</p>
                <p>Local time is: {weatherData.data.location.localtime}</p>
                <p>Condition is : {weatherData.data.current.condition.text}</p>
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
