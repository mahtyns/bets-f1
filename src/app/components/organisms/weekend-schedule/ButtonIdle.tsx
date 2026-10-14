"use client";

import { useNextRace } from '@/app/context/NextRaceContext';
import Countdown from '../../atoms/Countdown';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';

interface ButtonIdleProps {
    mainClass: string
}

export const ButtonIdle = (props: ButtonIdleProps) => {
    const { nextRace, betsOpensAt } = useNextRace();

    if (!nextRace || !betsOpensAt) return null;
    return (
        <div className={`${props.mainClass}__bottom ${props.mainClass}__bottom--idle`}>
            <Text variant="primary" text="Pools open in" mainClass={props.mainClass} />
            <span><Countdown targetDate={betsOpensAt} /></span>
            <Button variant="outlined" text="Pools closed now" disabled={true} />
        </div>
    )
}
