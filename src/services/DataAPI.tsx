import { WeatherRequestResponse } from "@/types/WeatherRequests";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

//export const [weatherData,setWeatherData] = useState<WeatherRequestResponse | null>(null);

const token = process.env.REACT_APP_API_KEY;


export const getDataApi = (city:string, setWeatherData: Dispatch<SetStateAction<WeatherRequestResponse | undefined>>) => {
    return axios.get<WeatherRequestResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${city}`)
    .then ((response)=>{
      setWeatherData(response.data);
    })
  };