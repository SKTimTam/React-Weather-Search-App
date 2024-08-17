
import { useQuery } from "react-query";

import { getWeatherData } from "@/services/getWeatherData";

export default function useWeatherDate (city:string) {
    const {data, error, isLoading} = useQuery({
        queryKey:["getWeatherData", city],
        queryFn: () => getWeatherData(city),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
    }) 
    return {data, error, isLoading}
}