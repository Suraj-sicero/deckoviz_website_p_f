export class AudioAnalyzer {
    context: AudioContext | null = null;
    analyzer: AnalyserNode | null = null;
    dataArray: Uint8Array | null = null;
    source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null = null;
    
    smoothedBands = {
        bass: 0,
        mid: 0,
        treble: 0,
        all: 0
    };

    constructor() {
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) return;

            this.context = new AudioContextClass();
            this.analyzer = this.context.createAnalyser();
            this.analyzer.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
        } catch (e) {
            console.error("Failed to initialize AudioAnalyzer:", e);
        }
    }

    async initMic() {
        if (!this.context || !this.analyzer) return;
        this.stopMic();
        
        if (this.context.state === 'suspended') {
            await this.context.resume();
        }
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.source = this.context.createMediaStreamSource(stream);
            this.source.connect(this.analyzer);
            
            // Ensure analyzer is NOT connected to destination to avoid feedback
            try { this.analyzer.disconnect(this.context.destination); } catch { /* Already disconnected */ }
        } catch (err) {
            console.error("Mic access error:", err);
            throw err;
        }
    }

    stopMic() {
        if (this.source && this.source instanceof MediaStreamAudioSourceNode) {
            this.source.mediaStream.getTracks().forEach(track => track.stop());
            this.source.disconnect();
            this.source = null;
        }
        this.smoothedBands = { bass: 0, mid: 0, treble: 0, all: 0 };
    }

    initFile(audioElement: HTMLAudioElement) {
        if (!this.context || !this.analyzer) return;
        if (this.source instanceof MediaElementAudioSourceNode) {
            return;
        }
        
        this.stopMic();
        
        this.source = this.context.createMediaElementSource(audioElement);
        this.source.connect(this.analyzer);
        this.analyzer.connect(this.context.destination);
    }

    update() {
        const analyzer = this.analyzer;
        const dataArray = this.dataArray;
        
        if (!analyzer || !dataArray) return this.smoothedBands;
        
        analyzer.getByteFrequencyData(dataArray);
        
        const binCount = dataArray.length;
        if (binCount === 0) return this.smoothedBands;

        let bass = 0, mid = 0, treble = 0;
        
        const bassEnd = Math.max(1, Math.floor(binCount * 0.05));
        const midEnd = Math.floor(binCount * 0.4);
        
        for (let i = 0; i < binCount; i++) {
            const val = this.dataArray[i] / 255;
            if (i < bassEnd) bass += val;
            else if (i < midEnd) mid += val;
            else treble += val;
        }

        const avgBass = bass / bassEnd;
        const avgMid = mid / Math.max(1, midEnd - bassEnd);
        const avgTreble = treble / Math.max(1, binCount - midEnd);
        const avgAll = (avgBass + avgMid + avgTreble) / 3;
        
        const l = (a: number, b: number, t: number) => a + (b - a) * t;
        
        this.smoothedBands.bass = l(this.smoothedBands.bass, avgBass, 0.25);
        this.smoothedBands.mid = l(this.smoothedBands.mid, avgMid, 0.2);
        this.smoothedBands.treble = l(this.smoothedBands.treble, avgTreble, 0.2);
        this.smoothedBands.all = l(this.smoothedBands.all, avgAll, 0.15);
        
        return this.smoothedBands;
    }

    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
}
