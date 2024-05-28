import { WeatherRequestResponse } from "@/types/WeatherRequests";
import { Card, CardHeader, CardTitle, CardContent } from "./card";


interface weatherCardProps {
    data: WeatherRequestResponse;
    historyData: string[];
}

export default function WeatherCard(props: weatherCardProps){
    return(
        <>
            <Card className="w-[350px]" style={{ textAlign: 'left' }}>
                <CardHeader>
                    <CardTitle> City: {props.data.location.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Temperature is: {props.data.current.temp_c} Celsius</p>
                    <p>Local time is: {props.data.location.localtime}</p>
                    <p>Condition is : {props.data.current.condition.text}</p>
                    <p>Latitude is : {props.data.location.lat}</p>
                    <p>Longtitude is : {props.data.location.lon}</p>
                    <p>Previous Searched City: {props.historyData[props.historyData.length - 2]}</p>
                </CardContent>
            </Card>
            <span style={{ display: 'inline-block', width: '100px' }}></span>
            <Card className='w-[700px]' style={{ textAlign: 'left' }}>
                <CardHeader>
                    <CardTitle>Facts about {props.data.location.name}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </>
)}