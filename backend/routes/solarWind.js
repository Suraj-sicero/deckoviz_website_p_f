
import express from "express";

const router = express.Router();

let cachedData = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchSolarWindData() {
  try {
    const [plasmaRes, magRes, kpRes] = await Promise.all([
      fetch("https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json"),
      fetch("https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json"),
      fetch("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json")
    ]);

    const plasmaData = await plasmaRes.json();
    const magData = await magRes.json();
    const kpData = await kpRes.json();

    // The data is usually an array of arrays where the first row is headers
    // We want the most recent data point (last row)
    const latestPlasma = plasmaData[plasmaData.length - 1];
    const latestMag = magData[magData.length - 1];
    const latestKp = kpData[kpData.length - 1];

    // Plasma headers: ["time_tag", "density", "speed", "temperature"]
    // Mag headers: ["time_tag", "bx_gsm", "by_gsm", "bz_gsm", "lon_gsm", "lat_gsm", "bt"]
    // Kp headers: ["time_tag", "kp", "a_index", "station_count"]

    const data = {
      speed: parseFloat(latestPlasma[2]) || 400,
      density: parseFloat(latestPlasma[1]) || 5,
      bz: parseFloat(latestMag[3]) || 0,
      kp: parseFloat(latestKp[1]) || 2,
      timestamp: latestPlasma[0],
      updatedAt: new Date().toISOString()
    };

    cachedData = data;
    lastFetch = Date.now();
    return data;
  } catch (err) {
    console.error("Error fetching solar wind data:", err);
    // Fallback values
    return {
      speed: 400,
      density: 5,
      bz: -2,
      kp: 3,
      timestamp: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFallback: true
    };
  }
}

router.get("/", async (req, res) => {
  if (cachedData && (Date.now() - lastFetch < CACHE_DURATION)) {
    return res.json(cachedData);
  }

  const data = await fetchSolarWindData();
  res.json(data);
});

export default router;
