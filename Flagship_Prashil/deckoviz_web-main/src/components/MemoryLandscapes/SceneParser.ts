import { SceneConfig, EnvironmentType, WeatherType, TimeOfDay } from './types';

export class SceneParser {
    static parse(text: string): SceneConfig {
        const lowerText = text.toLowerCase();
        
        let environment: EnvironmentType = 'abstract';
        if (this.containsAny(lowerText, ['forest', 'trees', 'woods', 'nature', 'green'])) environment = 'forest';
        else if (this.containsAny(lowerText, ['city', 'street', 'buildings', 'neon', 'urban'])) environment = 'city';
        else if (this.containsAny(lowerText, ['ocean', 'sea', 'water', 'beach', 'waves'])) environment = 'ocean';

        let weather: WeatherType = 'clear';
        if (this.containsAny(lowerText, ['rain', 'wet', 'storm', 'crying'])) weather = 'rain';
        else if (this.containsAny(lowerText, ['fog', 'mist', 'hazy', 'smoke'])) weather = 'fog';
        else if (this.containsAny(lowerText, ['snow', 'cold', 'winter', 'white'])) weather = 'snow';

        let time: TimeOfDay = 'day';
        if (this.containsAny(lowerText, ['night', 'dark', 'stars', 'moon', 'black'])) time = 'night';
        else if (this.containsAny(lowerText, ['sunset', 'evening', 'orange', 'gold'])) time = 'sunset';
        else if (this.containsAny(lowerText, ['morning', 'dawn', 'sunrise', 'pink'])) time = 'dawn';

        // Map emotions to colors and density
        const colors = this.getColorsForText(lowerText);
        const fogDensity = weather === 'fog' ? 0.1 : (weather === 'rain' ? 0.05 : 0.02);
        
        return {
            environment,
            weather,
            time,
            emotion: this.detectEmotion(lowerText),
            colors,
            fogDensity,
            lightIntensity: time === 'night' ? 0.4 : (time === 'sunset' ? 0.8 : 1.2),
            terrainHeight: environment === 'forest' ? 5 : (environment === 'city' ? 2 : 8),
            particleCount: weather === 'rain' ? 2000 : 500,
            motionSpeed: lowerText.includes('fast') ? 0.8 : (lowerText.includes('slow') ? 0.1 : 0.3)
        };
    }

    private static containsAny(text: string, keywords: string[]): boolean {
        return keywords.some(k => text.includes(k));
    }

    private static detectEmotion(text: string): string {
        if (this.containsAny(text, ['happy', 'joy', 'bright', 'love'])) return 'happy';
        if (this.containsAny(text, ['sad', 'lonely', 'dark', 'alone', 'crying'])) return 'lonely';
        if (this.containsAny(text, ['nostalgic', 'remember', 'past', 'childhood'])) return 'nostalgic';
        if (this.containsAny(text, ['calm', 'peaceful', 'quiet', 'still'])) return 'peaceful';
        return 'neutral';
    }

    private static getColorsForText(text: string): string[] {
        if (text.includes('happy')) return ['#ff9a9e', '#fad0c4', '#ffecd2'];
        if (text.includes('lonely')) return ['#2c3e50', '#4ca1af', '#2c3e50'];
        if (text.includes('forest')) return ['#134e5e', '#71b280', '#134e5e'];
        if (text.includes('city')) return ['#000000', '#434343', '#000000'];
        return ['#000000', '#434343', '#666666'];
    }
}
