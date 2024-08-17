import { WeatherRequestResponse } from "@/types/WeatherRequests";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

//export const [weatherData,setWeatherData] = useState<WeatherRequestResponse | null>(null);

const token = process.env.REACT_APP_API_KEY;

export const getWeatherDataApi = (city:string, setWeatherData: Dispatch<SetStateAction<WeatherRequestResponse | undefined>>, setIsLoading: Dispatch<React.SetStateAction<boolean>>) => {
    return axios.get<WeatherRequestResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${city}`)  
    .then ((response) => {
      setWeatherData(response.data);
      setIsLoading(true);
    }).catch((error) => {
      if (error.response) { // status code out of the range of 2xx
          console.log("Status :" + error.response.status);
        return error.response
      } else if (error.request) { // The request was made but no response was received
          console.log(error.message);
        return error.message
      } else {// Error on setting up the request
          console.log('Error' + error.message);
        return error.response 
      }
  }).finally(()=> setIsLoading(false))
};