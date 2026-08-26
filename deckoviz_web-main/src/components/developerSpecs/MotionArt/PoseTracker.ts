import { Pose, Results } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export class PoseTracker {
    pose: Pose;
    camera: Camera | null = null;
    onResults: (results: Results) => void;

    constructor(onResults: (results: Results) => void) {
        this.onResults = onResults;
        this.pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        this.pose.onResults(this.onResults);
    }

    async start(videoElement: HTMLVideoElement) {
        this.camera = new Camera(videoElement, {
            onFrame: async () => {
                await this.pose.send({ image: videoElement });
            },
            width: 640,
            height: 480,
        });
        await this.camera.start();
    }

    stop() {
        if (this.camera) {
            this.camera.stop();
        }
    }
}
