import { WeatherRequestResponse } from "@/types/WeatherRequests";
import axios, { AxiosError } from "axios";
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

export interface ApiResponse {
  data: WeatherRequestResponse[]
  status: number
}

interface ApiError {
  message: string
  status?: number
}

export const getWeather = async (city: string): Promise<ApiResponse | ApiError> => {
 try {
    const { data } = await axios.get<ApiResponse>(`http://api.weatherapi.com/v1/current.json?key=${token}&q=${city}`)
    return data
  } catch (error) {
    const err = error as AxiosError
    return {
      message: err?.message,
      status: err?.response?.status
    }
  }

}