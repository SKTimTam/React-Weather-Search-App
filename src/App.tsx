import { useState } from 'react'
import './App.css'
import { WeatherRequestResponse } from './types/WeatherRequests';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { getWeatherDataApi } from './services/WeatherDataAPI';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Header } from './components/ui/header';
import WeatherCard from './components/ui/weatherCard';





  function App() {

  const [weatherData,setWeatherData] = useState<WeatherRequestResponse>();
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([''])

  
  function ChangeMapView({center}: any) {
    console.log(center);
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }




  const handleButtonClick = () => {
    getWeatherDataApi(city, setWeatherData);
    setHistory((history)=> [...history, city]);

  }

  console.log(history)
  console.log(weatherData)


  
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
              <div className="flex-container" style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <WeatherCard data={weatherData} historyData={history}/>
                {/* <span style={{ display: 'inline-block', width: '100px' }}></span> */}
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
              <p> Try your favourite City!</p>
            </CardContent>
          </Card>}
      </div>

    </>
  );
};

export default App;
