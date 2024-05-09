
export interface WeatherRequestResponse {
    location: {
        name: String,
        region: String,
        country: String,
        lat: number,
        lon: number,
        tz_id: String,
        localtime_epoch: number,
        localtime: String,
    };
    current: {
        last_updated_epoch: number,
        last_updated: String,
        temp_c: number,
        temp_f: number,
        is_day: number,
        condition: {
            text: String,
            icon: String,
            code: number,
        },
        wind_mph: number,
        wind_kph: number,
        wind_degree: number,
        wind_dir: String,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        precip_in: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        feelslike_f: number,
        vis_km: number,
        vis_miles: number,
        uv: number,
        gust_mph: number,
        gust_kph: number
    }  
};
