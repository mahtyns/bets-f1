import Title from "../../atoms/Title";
import Text from "../../atoms/Text";
import SessionRow from "../../molecules/weekend-schedule/SessionRow";
import RaceWeekGate from "../../layouts/RaceWeekGate";
import { ButtonIdle } from "./ButtonIdle";
import { ButtonOpen } from "./ButtonOpen";
import { ButtonLocked } from "./ButtonLocked";

export interface ScheduleItem {
    code: string,
    name: string,
    day: string,
    time: string
}

interface WeekendScheduleProps {
    mainClass: string,
    title: string,
    timeZone: string,
    sessions: ScheduleItem[]
}

const WeekendSchedule = (props: WeekendScheduleProps) => {

    return (
        <>
            <div className={`${props.mainClass}__header`}>
                <Title title={props.title} isH1={false} />
                <Text text={props.timeZone} variant="muted" mainClass={`${props.mainClass}__timezone`} />
            </div>
            <ul className={`${props.mainClass}__sessions`}>
                {props.sessions.map((session) => (
                    <SessionRow key={`${session.code}-${session.day}`} mainClass={props.mainClass} {...session} />
                ))}
            </ul>
            <RaceWeekGate
                open={<ButtonOpen mainClass={props.mainClass} />}
                locked={<ButtonLocked mainClass={props.mainClass} />}
                idle={<ButtonIdle mainClass={props.mainClass} />}
            />
        </>
    )
}

export default WeekendSchedule