import axios from "axios";
import { isErrored } from "stream";


const token = process.env.REACT_APP_API_KEY;

export default async function getWeatherData<WeatherRequestResponse> (city: string) {
    try {
        const weatherData = await axios.get<WeatherRequestResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${city}`).then((x)=>x.data).catch((error)=>console.log(error));
        return weatherData;
    } catch (error) {
        console.log(error);
    }
};