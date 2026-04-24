export class AudioAnalyzer {
    context!: AudioContext;
    analyzer!: AnalyserNode;
    dataArray!: Uint8Array;
    source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null = null;
    
    smoothedBands = {
        bass: 0,
        mid: 0,
        treble: 0,
        all: 0
    };

    constructor() {
        const AudioContextClass = window.AudioContext || (window as unknown as Window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.context = new AudioContextClass();
        this.analyzer = this.context.createAnalyser();
        this.analyzer.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
    }

    async initMic() {
        if (this.context.state === 'suspended') {
            await this.context.resume();
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.source = this.context.createMediaStreamSource(stream);
        this.source.connect(this.analyzer);
    }

    initFile(audioElement: HTMLAudioElement) {
        if (this.source) {
            // Already initialized, just ensure it's connected
            return;
        }
        this.source = this.context.createMediaElementSource(audioElement);
        this.source.connect(this.analyzer);
        this.analyzer.connect(this.context.destination);
    }

    update() {
        if (!this.analyzer || !this.dataArray) return this.smoothedBands;
        
        // Ensure dataArray is a valid Uint8Array for the analyzer
        const bins = this.dataArray as Uint8Array;
        this.analyzer.getByteFrequencyData(bins);
        
        const binCount = bins.length;
        if (binCount === 0) return this.smoothedBands;

        let bass = 0, mid = 0, treble = 0;
        
        // Accurate bin mapping for fftSize 256 (128 bins)
        // Bass: ~0-250Hz (Bins 0-2)
        // Mid: ~250-4000Hz (Bins 2-24)
        // Treble: ~4000Hz+ (Bins 24-128)
        const bassEnd = Math.max(1, Math.floor(binCount * 0.05)); // ~6% of spectrum
        const midEnd = Math.floor(binCount * 0.4); // ~40% of spectrum
        
        for (let i = 0; i < binCount; i++) {
            const val = this.dataArray[i] / 255;
            if (i < bassEnd) bass += val;
            else if (i < midEnd) mid += val;
            else treble += val;
        }

        const avgBass = bass / bassEnd;
        const avgMid = mid / (midEnd - bassEnd);
        const avgTreble = treble / (binCount - midEnd);
        const avgAll = (avgBass + avgMid + avgTreble) / 3;
        
        // Smoothing (Increased factor for more "snap")
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        this.smoothedBands.bass = lerp(this.smoothedBands.bass, avgBass, 0.25);
        this.smoothedBands.mid = lerp(this.smoothedBands.mid, avgMid, 0.2);
        this.smoothedBands.treble = lerp(this.smoothedBands.treble, avgTreble, 0.2);
        this.smoothedBands.all = lerp(this.smoothedBands.all, avgAll, 0.15);
        
        return this.smoothedBands;
    }

    resume() {
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}
