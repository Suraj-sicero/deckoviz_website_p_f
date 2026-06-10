import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1ZmU5MjNiLWNiZDgtNDQ2Yy1hOTJlLWZlZTZkZTgzZGY1NiIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc4MDUxMjkwNSwiZXhwIjoxNzgxMTE3NzA1fQ.5ZShIitzFd-j025VqYTPQ2yo9KkeVdHgqX31JpymJrw";

async function runTest() {
  console.log("Triggering song-visuals process API request...");
  try {
    const res = await axios.post("http://localhost:5000/api/vizzy-studio/song-visuals/process", {
      lyrics: "Golden sunrise breaks the night, stars fade out of sight. A new beginning has begun.",
      n: 2,
      musicStyle: "Lofi",
      artStyle: "watercolor",
      transitionEffect: "fade-black"
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 180000 // 3 minutes timeout
    });

    console.log("API Response Success:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("API Response Error:", err.response.status, err.response.data);
    } else {
      console.error("API Request Error:", err.message);
    }
  }
}

runTest();
