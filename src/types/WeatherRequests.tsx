
interface locationDetails {
    name: String,
    region: String,
    country: String,
    lat: Number,
    lon: Number,
    tz_id: String,
    localtime_epoch: Number,
    localtime: String,
};

interface currentDetails {
    last_updated_epoch: Number,
    last_updated: String,
    temp_c: Number,
    temp_f: Number,
    is_day: Number,
    condition: {
        [key: string]: conditionDetails
    },
    wind_mph: Number,
    wind_kph: Number,
    wind_degree: Number,
    wind_dir: String,
    pressure_mb: Number,
    pressure_in: Number,
    precip_mm: Number,
    precip_in: Number,
    humidity: Number,
    cloud: Number,
    feelslike_c: Number,
    feelslike_f: Number,
    vis_km: Number,
    vis_miles: Number,
    uv: Number,
    gust_mph: Number,
    gust_kph: Number
};

interface conditionDetails {
    text: String,
    icon: String,
    code: Number,
};

export interface WeatherRequestResponse {
    data: WeatherRequests;
}

interface WeatherRequests {

    location: {
        [key: string]: locationDetails
    };
    current: {
        [key: string]: currentDetails
    }  
};

