import Text from "../../atoms/Text";
import { RaceWeather } from "@/app/data/weather";

interface WeatherSummaryProps {
    weather: RaceWeather,
    mainClass: string
}

const WeatherSummary = (props: WeatherSummaryProps) => {
    const items = [
        { label: 'Air', value: `${props.weather.airTemp}°C` },
        { label: 'Track', value: `${props.weather.trackTemp}°C` },
        { label: 'Wind', value: `${props.weather.windKmh} km/h` },
        { label: 'Rain', value: props.weather.rain ? 'Yes' : 'No' },
    ];

    return (
        <div className={`${props.mainClass}__weather weather`}>
            {items.map((item) => (
                <div key={item.label} className="weather__item">
                    <Text text={item.label} variant="primary" mainClass="weather__label" />
                    <Text text={item.value} variant="white" mainClass="weather__value" />
                </div>
            ))}
        </div>
    )
}

export default WeatherSummary