import { useState, useEffect } from 'react';

export function useRunStorage() {
    const [runs, setRuns] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("runs");
        if (saved) setRuns(JSON.parse(saved));
    }, []);

    // Add single run safely
    const addRun = (run) => {        
        setRuns(prev => {
            const updated = [...prev, run];
            localStorage.setItem("runs", JSON.stringify(updated));
            return updated;
        });
    };

    // Add multiple runs at once
    const addRunBatch = (newRuns) => {
        setRuns(prev => {
            const combined = [...prev, ...newRuns];

            const unique = combined.filter(
                (run, index, self) =>
                    index === self.findIndex(
                        r => r.date === run.date && r.distanceKm === run.distanceKm
                    )
            );
            localStorage.setItem("runs", JSON.stringify(unique));
            return unique;
        });
    };

    return { runs, addRun, addRunBatch };
}