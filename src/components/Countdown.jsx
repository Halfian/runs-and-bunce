// Implement CountdownTimer using dayjs to calculate days until October 2026.

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function Countdown() {
    const marathonDate = dayjs("2026-10-04T03:30:00");
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = dayjs();
        const diff = marathonDate.diff(now);
        const duration = dayjs.duration(diff);

        return {
            days: Math.floor(duration.asDays()),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer); 
    }, []);

    return (
        <div className="bg-dark-bg border border-neon-blue rounded-lg p-6 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-neon-pink mb-4">Kuala Lumpur SC Marathon 2026</h2>
            <div className="flex justify-center gap-6 text-neon-blue font-mono text-xl">
                <Timebox label="Days" value={timeLeft.days} />
                <Timebox label="Hours" value={timeLeft.hours} />
                <Timebox label="Minutes" value={timeLeft.minutes} />
                <Timebox label="Seconds" value={timeLeft.seconds} />
            </div>
        </div>
    );
}

function Timebox({ label, value }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl font-bold animate-pulse">{value}</span>
            <span className="text-sm text-neon-pink">{label}</span>
        </div>
    )
}