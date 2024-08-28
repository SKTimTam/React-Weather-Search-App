import { useState } from 'react'
import './App.css'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button  } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { getWeather, getWeatherDataApi, ApiResponse } from './services/WeatherDataAPI';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Header } from './components/ui/header';
import WeatherCard from './components/ui/weatherCard';




 function App() {
  
  const [weatherData,setWeatherData] = useState<WeatherRequestResponse>();
  const [city, setCity] = useState<string>('');
  const [history, setHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value)
  }

  function ChangeMapView({center}: any) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null
  }

  const handleButtonClick = async () => {
    const data = await getWeather(city)
    setWeatherData(data?.data[0])
    getWeatherDataApi(city, setWeatherData, setIsLoading);
    setHistory((history) => [...history, city]);
  }



  
  return (
    <>
      <div className="flex-container" style={{display: 'flex', justifyContent: 'flex-start'}} >
        <Header/>
      </div>
      <br/>
      <div className="flex-container space-x-2.5" style={{display: 'flex', flexDirection: 'row'}} >
          <Input className="w-[290px]" type="string" placeholder="City Name" onChange={handleChange}/>
          <Button className="w-[50px]" type="submit" onClick={handleButtonClick}> Search </Button>
      </div>
      <div className="flex-container" style={{display: 'flex', flexDirection: 'column'}} >
        <br/>
          {weatherData ? (
            <>
              <div className="flex-container" style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                {isLoading ? <div className="loader"/>: <WeatherCard data={weatherData} historyData={history}/>}
                <Card className='w-[350px]' style={{ textAlign: 'left' }}>
                  <CardHeader>
                    <CardTitle>Weather Forecast: {weatherData.location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                  </CardContent>
                </Card>
                <Card className='w-[350px]' style={{ textAlign: 'left' }}>
                  <CardHeader>
                    <CardTitle>Facts about {weatherData.location.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Latitude is : {weatherData.location.lat}</p>
                    <p>Longtitude is : {weatherData.location.lon}</p>
                    <p>Region is : {weatherData.location.region}</p>
                  </CardContent>
                </Card>
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
              <p> Try your favourite city!</p>
            </CardContent>
          </Card>}
      </div>

    </>
  );
};

export default App;
