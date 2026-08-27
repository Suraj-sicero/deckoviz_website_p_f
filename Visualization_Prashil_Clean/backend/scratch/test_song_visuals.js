import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function runTest() {
  console.log("Starting Song Visuals Creator integration test...");
  
  // 1. Log in to get token
  let token = "";
  try {
    const loginRes = await axios.post("http://localhost:5000/api/auth/signin", {
      email: "vedmanirn15@gmail.com",
      password: "password123"
    });
    token = loginRes.data.token;
    console.log("Successfully logged in! Received JWT token.");
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    process.exit(1);
  }

  // 2. Call process endpoint
  console.log("Calling song-visuals/process endpoint with visualFormat = 'video'...");
  try {
    const processRes = await axios.post("http://localhost:5000/api/vizzy-studio/song-visuals/process", {
      lyrics: "Under the starry night sky\nAn explorer wanders high\nDreaming of worlds going by",
      n: 2, // Keep it to 2 segments to run fast
      musicStyle: "Lofi",
      artStyle: "watercolor",
      transitionEffect: "fade-black",
      visualFormat: "video"
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: 120000 // Give it plenty of time (2 mins) to generate assets
    });

    console.log("Integration test response:", JSON.stringify(processRes.data, null, 2));
    
    if (processRes.data.success) {
      console.log("✅ Success! Video generated at:", processRes.data.videoUrl);
      console.log("✅ Custom song track generated at:", processRes.data.songUrl);
      console.log("✅ Segments:", processRes.data.segments);
    } else {
      console.error("❌ Failed: success flag is false", processRes.data);
    }
  } catch (err) {
    console.error("❌ Process endpoint failed:", err.response?.data || err.message);
  }
}

runTest();
