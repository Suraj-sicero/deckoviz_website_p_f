import { DataPoint } from './types';

export class LiveData {
    static async fetchWeather(city: string = 'London'): Promise<DataPoint[]> {
        // Using a free open-source weather API (Open-Meteo) which doesn't require an API key
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,surface_pressure`);
            const data = await response.json();
            
            if (!data.hourly) return [];

            // Transform into DataPoints
            const points: DataPoint[] = [];
            for (let i = 0; i < 168; i += 4) { // Every 4 hours for a week
                points.push({
                    time: data.hourly.time[i],
                    temp: data.hourly.temperature_2m[i],
                    humidity: data.hourly.relativehumidity_2m[i],
                    wind: data.hourly.windspeed_10m[i],
                    pressure: data.hourly.surface_pressure[i]
                });
            }
            return points;
        } catch (err) {
            console.error("Live weather fetch failed", err);
            return [];
        }
    }
}
