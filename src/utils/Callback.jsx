import { useEffect, useState } from 'react';
import { useRunStorage } from '../hooks/useRunStorage';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const { addRunBatch } = useRunStorage();
    const [status, setStatus] = useState("Connecting to Strava...");
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            setStatus("No code found in URL");
            return; 
        }

        // Exchange code for access token
        fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: 243950,
                client_secret: "f8d491c9280a733089e210513e6f9ebf325aa808",
                code,
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:5173/callback",
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (!data.access_token) {
                    setStatus("Failed to get token");
                    return;
                }
                setStatus("Fetching activities...");

                // Fetch activities
                return fetch(
                    "https://www.strava.com/api/v3/athlete/activities?per_page=30",
                    {
                        headers: {
                            Authorization: `Bearer ${data.access_token}`
                        }
                    }                
                );
            })
            .then((res) => res?.json())
            .then((acts) => {
                if (Array.isArray(acts)) {
                    const runs = acts
                        .filter(a => a.type === "Run")
                        .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                        .map((act) => ({
                            distanceKm : act.distance / 1000,
                            paceMinKm: (act.moving_time / 60) / (act.distance / 1000),
                            date: act.start_date,
                        }));
                // Add all runs at once
                addRunBatch(runs);
                
                setStatus("Activities loaded!");
                // Redirect back to dashboard after 1s
                setTimeout(() => navigate("/"), 1000);
                } else {
                    setStatus("Failed loading activities");
                }
            })
            .catch((err) => setStatus("Error: " + err.message));
    }, [addRunBatch, navigate]);

    return (
        <p className="text-neon-blue">{status}</p>
    )
}