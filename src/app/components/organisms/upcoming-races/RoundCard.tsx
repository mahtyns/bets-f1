import { Label } from "../../atoms/Label";
import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import Flag from "../../atoms/Flag";
import TrackLayoutCard from "../../molecules/next-race/TrackLayoutCard";
import WeatherSummary from "../../molecules/weather-summary/WeatherSummary";
import { Round, RoundStatus } from "@/app/data/rounds";
import { RaceWeather } from "@/app/data/weather";
import { formatRaceDays } from "@/app/utils/helpers/formatRaceDays";
import Tag from "../../atoms/Tag";


interface RoundCardProps {
    mainClass: string,
    round: Round,
    weather: RaceWeather | null
}


const statusLabels: Record<RoundStatus, { text: string, variant: 'primary' | 'secondary' | 'tertiary' }> = {
    completed: { text: 'Completed', variant: 'primary' },
    next: { text: 'Next race', variant: 'secondary' },
    upcoming: { text: 'Upcoming', variant: 'tertiary' },
    ongoing: { text: 'Ongoing', variant: 'secondary' },
};

const RoundCard = (props: RoundCardProps) => {
    const { round, weather, mainClass } = props;
    const cardClass = `${mainClass}__card`;
    const status = statusLabels[round.status];

    return (
        <article className={`${cardClass} ${cardClass}--${round.status}${round.isSprint ? ` ${cardClass}--sprint` : ''}`}>
            <div className={`${cardClass}-topbar`}>
                <Text text={`Round ${String(round.round).padStart(2, '0')}`} variant="white" mainClass={`${cardClass}-round`} />
                <Text text={formatRaceDays(round.start, round.end)} variant="muted" mainClass={`${cardClass}-dates`} />
                <Flag src={round.flag} alt={round.country} mainClass={cardClass} />
            </div>
            <Label text={status.text} variant={status.variant} mainClass={cardClass} />
            <Title title={round.name} isH1={false} />
            {round.isSprint && <Tag text="Sprint weekend" mainClass={cardClass} />}
            <Text text={`${round.circuit} • ${round.country}`} variant="primary" mainClass={`${cardClass}-subtitle`} />
            <TrackLayoutCard
                mainClass={cardClass}
                image={round.image}
                name={round.circuit}
                type={round.type}
            />
            {weather && <WeatherSummary mainClass={cardClass} weather={weather} />}
        </article>
    )
}

export default RoundCard