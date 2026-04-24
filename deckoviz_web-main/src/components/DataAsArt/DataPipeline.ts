import { DataPoint, MappingConfig, NormalizedPoint } from './types';

export class DataPipeline {
    static normalize(data: DataPoint[], config: MappingConfig): NormalizedPoint[] {
        if (!data || data.length === 0) return [];

        const fields = Object.keys(config) as (keyof MappingConfig)[];
        const stats: { [key: string]: { min: number; max: number } } = {};

        // Find min/max for each mapped field
        fields.forEach(mappingKey => {
            const dataField = config[mappingKey];
            let min = Infinity;
            let max = -Infinity;

            data.forEach(d => {
                const val = Number(d[dataField]);
                if (!isNaN(val)) {
                    min = Math.min(min, val);
                    max = Math.max(max, val);
                }
            });

            // Avoid division by zero
            if (min === max) {
                min -= 1;
                max += 1;
            }

            stats[dataField] = { min, max };
        });

        return data.map((d, i) => {
            const mapped: any = {};
            
            mapped.x = this.getNormalizedValue(d[config.xField], stats[config.xField]);
            mapped.y = this.getNormalizedValue(d[config.yField], stats[config.yField]);
            mapped.size = this.getNormalizedValue(d[config.sizeField], stats[config.sizeField]);
            mapped.color = this.getNormalizedValue(d[config.colorField], stats[config.colorField]);
            mapped.motion = this.getNormalizedValue(d[config.motionField], stats[config.motionField]);
            mapped.opacity = 1.0;

            return {
                id: `point-${i}`,
                original: d,
                mapped: mapped as NormalizedPoint['mapped']
            };
        });
    }

    private static getNormalizedValue(val: any, range: { min: number; max: number }): number {
        const num = Number(val);
        if (isNaN(num)) return 0.5;
        return (num - range.min) / (range.max - range.min);
    }

    static parseCSV(csv: string): DataPoint[] {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const results: DataPoint[] = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const values = lines[i].split(',').map(v => v.trim());
            const obj: DataPoint = {};
            headers.forEach((h, index) => {
                const val = values[index];
                obj[h] = isNaN(Number(val)) ? val : Number(val);
            });
            results.push(obj);
        }
        return results;
    }
}
