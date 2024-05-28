import { useState } from 'react'
import './App.css'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { getDataApi } from './services/DataAPI';
import { Header } from './components/ui/header';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import WeatherCard  from './components/ui/weatherCard'




  function App() {

  const [weatherData,setWeatherData] = useState<WeatherRequestResponse>();
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([''])
  const [center, setCenter] = useState<[number, number] | undefined>([50,50])

  
  function ChangeMapView({center}: any) {
    console.log(center);
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }




  const handleButtonClick = () => {
    getDataApi(city,setWeatherData);
    setHistory((history)=> [...history, city]);
    if (weatherData) {
      setCenter([weatherData.location.lat,weatherData.location.lon])
    }
  }

  console.log(history)
  console.log(weatherData)
  console.log(center)

  
  return (
    <>
      <div className="flex-container" style={{display: 'flex', justifyContent: 'flex-start'}} >
        <Header/>
      </div>
      <br/>
      <div className="flex-container" style={{display: 'flex', justifyContent: 'flex-start'}} >
        <Input className="w-[300px]" type="string" placeholder="City Name" onChange={(e)=>setCity(e.target.value)}/>
        <Button className="w-[50px]" type="submit" onClick={handleButtonClick}>Search</Button>
      </div>
      <div className="flex-container" style={{display: 'flex', flexDirection: 'column'}} >
        <br/>
          {weatherData ? (
            <>
              <div className="flex-container" style={{display: 'flex', flexDirection: 'row'}}>
                <WeatherCard data={weatherData} historyData={history}/>
              </div>
              <br/>
                <MapContainer center={[weatherData.location.lat,weatherData.location.lon]} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[weatherData.location.lat,weatherData.location.lon]}/>
                  <ChangeMapView center={[weatherData.location.lat,weatherData.location.lon]}/>
                </MapContainer>
            </>
            
          ) : 
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle> Enter in a city name</CardTitle>
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
