// Build WeeklyCharts with react-chartjs-2 for mileage and pace.

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from 'react-chartjs-2';
import { useRunStorage } from '../hooks/useRunStorage';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
dayjs.extend(weekOfYear);

export default function WeeklyCharts() {
    const { runs } = useRunStorage();

    const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI;
    const SCOPE = import.meta.env.VITE_STRAVA_SCOPE;
    const AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
    console.log("Auth URL:", AUTH_URL)

    // Group runs by week
    const weeklyData = {};
    runs.forEach((run) => {
        console.log("Run values:", run.distanceKm, typeof run.distanceKm, run.paceMinKm, typeof run.paceMinKm);
        const week = dayjs(run.date).week();
        if (!weeklyData[week]) weeklyData[week] = { distance: 0, pace: [] };
        weeklyData[week].distance += Number(run.distanceKm) || 0;
        weeklyData[week].pace.push(Number(run.paceMinKm) || 0);
    });

    const weeks = Object.keys(weeklyData).sort((a, b) => a - b);
    const mileage = weeks.map((w) => weeklyData[w].distance);
    const avgPace = weeks.map(
        (w) => 
        (
            weeklyData[w].pace.reduce((a, b) => a + b, 0) /
            weeklyData[w].pace.length
        ).toFixed(2)
    );

    console.log("WeeklyData:", weeklyData);

    return (
        <div className="bg-dark-bg border border-neon-blue rounded-lg p-6">
            <h2 className="text-2xl font-bold text-neon-pink mb-4">Weekly Progress</h2>

            <button
                onClick={() => (window.location.href = AUTH_URL)}
                className="bg-neon-blue text-dark-bg px-4 py-2 rounded"
                >
                Connect to Strava
            </button>


            {weeks.length > 0 ? (
                <div className="w-full max-w-full overflow-x-hidden">
                    {/* Distance over time */}
                    <div className="h-[250px] w-full sm:h-[220px] md:h-[250px]">
                        <Line 
                            data={{
                                labels: weeks,
                                datasets: [
                                    {
                                        label: "Weekly Mileage (km)",
                                        data: mileage,
                                        borderColor: "#00FFFF",
                                        backgroundColor: "#00FFFF33",
                                    },
                                ],
                            }}
                            options={{ 
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true },
                                },
                            }}
                            redraw
                        />
                    </div>

                    {/* Average pace */}
                    <div className="h-[250px] w-full sm:h-[220px] md:h-[250px]">
                        <Bar 
                            data={{
                                labels: weeks,
                                datasets: [
                                    {
                                        label: "Average Pace (min/km)",
                                        data: avgPace,
                                        backgroundColor: "#FF00FF",
                                    },
                                ],
                            }}
                            options={{ 
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: { beginAtZero: true },
                                },
                            }}
                            redraw
                        />
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("runs")
                        }}
                        className="mt-4 bg-neon-pink text-dark-bg px-3 py-2 rounded hover:bg-neon-blue transition"
                    >
                        Reset Data
                    </button>     
                </div>
            ) : (
                <p className="text-neon-blue">Keep running to build weekly charts!</p>
            )}
        </div>
    );
}