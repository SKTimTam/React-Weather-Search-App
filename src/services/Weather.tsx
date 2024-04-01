import { WeatherRequestResponse } from '@/types/WeatherRequests';
import axios from 'axios';

const token = "e05f10347f584d3bade00436243103";

export async function getCurrentWeatherData(
    CityName: string
) {
    return axios.get<WeatherRequestResponse>(
        `http://api.weatherapi.com/v1/current.json?key=${token}&q=${CityName}`
    ).then ((x) => {
        const currentWeatherItems: currentSimpleWeatherItem[] = [];
    x.data.data.map(function (weatherRequest) {
        currentWeatherItems.push({
            Name: weatherRequest.location.locationDetails.name,
            Region: weatherRequest.location.locationDetails.region,
            Country: weatherRequest.location.locationDetails.country,
            LocalTime: weatherRequest.location.locationDetails.localtime,
            Lat: weatherRequest.location.locationDetails.lat,
            Lon: weatherRequest.location.locationDetails.lon,
            Temp_c: weatherRequest.current.currentDetails.temp_c,
            Temp_f: weatherRequest.current.currentDetails.temp_f,
            ConditionText: weatherRequest.current.currentDetails.condition.conditionDetails.text,
            ConditionIcon: weatherRequest.current.currentDetails.condition.conditionDetails.icon,
        });
    });
    });


}