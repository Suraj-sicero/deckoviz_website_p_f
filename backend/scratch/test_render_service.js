import { renderVideo } from "../services/VideoRenderService.js";

async function runTest() {
  console.log("Starting test_render_service with local MP3...");
  try {
    const videoUrl = await renderVideo({
      images: [
        "https://picsum.photos/seed/1/1280/720",
        "https://picsum.photos/seed/2/1280/720",
        "https://picsum.photos/seed/3/1280/720"
      ],
      transitionDuration: 10,
      transitionEffect: "fade-black",
      music: "/uploads/song-gemini-1780511783969-otes5f.mp3",
      musicVolume: 100,
      narration: null
    });
    console.log("Test finished! Output video url:", videoUrl);
  } catch (err) {
    console.error("Test failed:", err);
  }
}

runTest();
