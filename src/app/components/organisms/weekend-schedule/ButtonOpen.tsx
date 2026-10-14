"use client";

import { useNextRace } from '@/app/context/NextRaceContext';
import Countdown from '../../atoms/Countdown';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';

interface ButtonOpenProps {
    mainClass: string
}

export const ButtonOpen = (props: ButtonOpenProps) => {
    const { nextRace, betsClosesAt } = useNextRace();

    if (!nextRace || !betsClosesAt) return null;
    return (
        <div className={`${props.mainClass}__bottom ${props.mainClass}__bottom--open`}>
            <Text variant="primary" text="Pools are open" mainClass={props.mainClass} />
            <span><Countdown targetDate={betsClosesAt} /></span>
            <Button variant="primary" text="Place your bets" />
        </div>
    )
}
