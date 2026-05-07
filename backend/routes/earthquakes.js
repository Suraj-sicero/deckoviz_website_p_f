
import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache

// USGS API endpoints
const USGS_24H = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";
const USGS_1Y_LARGE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"; // Month for performance, or year M5.5+
const USGS_1Y_M55 = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5.5&starttime=";

router.get("/", async (req, res) => {
  try {
    const cachedData = cache.get("seismic_data");
    if (cachedData) return res.json(cachedData);

    const now = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(now.getFullYear() - 1);
    const lastYearStr = lastYear.toISOString().split('T')[0];

    const [recent, major] = await Promise.all([
      axios.get(USGS_24H),
      axios.get(`${USGS_1Y_M55}${lastYearStr}`)
    ]);

    const data = {
      recent: recent.data.features,
      major: major.data.features
    };

    cache.set("seismic_data", data);
    res.json(data);
  } catch (error) {
    console.error("Earthquake API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch seismic data" });
  }
});

export default router;
