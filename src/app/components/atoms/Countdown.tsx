"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

const Countdown = ({ targetDate }: CountdownProps) => {
    const [remaining, setRemaining] = useState<number | null>(null);

    useEffect(() => {
        const update = () =>
            setRemaining(Math.max(0, new Date(targetDate).getTime() - Date.now()));

        const timeout = setTimeout(update, 0);
        const interval = setInterval(update, 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [targetDate]);

    if (remaining === null) return null;

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        <>
            {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </>
    )
}

export default Countdown