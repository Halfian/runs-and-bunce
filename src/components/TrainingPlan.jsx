// Checkbox list + calendar

import { useState, useEffect } from 'react';

export default function TrainingPlan() {
    const [schedule, setSchedule] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
     
    const runTypes = ["Long Run", "Tempo Run", "Easy Run", "Rest Day"];

    const assignRun = (day, type) => {
        setSchedule(prev => ({ ...prev, [day]: type }));
        setSelectedDay(null); // close dropdown
    };

    useEffect(() => {
        const saved = localStorage.getItem("trainingPlan");
        if (saved) setSchedule(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("trainingPlan", JSON.stringify(schedule));
    }, [schedule]);

    return (
        <div className="grid grid-rows-7 gap-2 text-center text-neon-blue">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                    key={day}
                    className="relative border border-neon-blue rounded p-2 hover:bg-neon-pink hover:text-dark-bg transition cursor-pointer"
                    onClick={() => setSelectedDay(day)}
                >
                    <p className="font-bold">{day}</p>

                    {/* Show assigned run type as a badge */}
                    {schedule[day] && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs rounded bg-neon-pink text-dark-bg font-semibold">
                            {schedule[day]}
                        </span>
                    )}

                    {/* Compact dropdown menu */}
                    {selectedDay === day && (
                        <div 
                            className="fixed inset-0 flex items-center justify-center bg-dark-bg/60 z-50"
                            onClick={() => setSelectedDay(null)} // click outside to close
                        >
                            <div
                                className="flex flex-wrap gap-2 bg-dark-bg border border-neon-pink rounded-lg p-4"
                                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                            >
                                {runTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => assignRun(day, type)}
                                        className="px-1 py-2 text-sm rounded bg-neon-blue text-dark-bg hover:bg-neon-pink hover:text-dark-bg transition"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))
            }
        </div>
    );
}