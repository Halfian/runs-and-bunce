import { useRunStorage } from "../hooks/useRunStorage";

export default function TodayStats() {
    const { runs } = useRunStorage();
    const latestRun = runs[runs.length - 1];

    return (
        <div className="bg-dark-bg border border-neon-blue rounded-lg p-6">
            <h2 className="text-2xl font-bold text-neon-pink mb-4">Today's Stats</h2>

            {latestRun ? (
                <div className="space-y-2 text-neon-blue">
                    <p><span className="text-neon-pink">Distance:</span> {(latestRun.distanceKm).toFixed(2)} km</p>
                    <p><span className="text-neon-pink">Pace:</span> {(latestRun.paceMinKm).toFixed(2)} min/km</p>
                    <p>
                        <span className="text-neon-pink">Date:</span>{" "} 
                        {new Date(latestRun.date).toLocaleDateString("en-GB", {
                            timeZone: "Asia/Jakarta",
                        })}
                    </p>
                </div>
            ) : (
                <p className="text-neon-blue">No run uploaded yet. Add a GPX file to see stats.</p>
            )}
        </div>
    );
}