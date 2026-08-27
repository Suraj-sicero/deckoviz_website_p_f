
// solarCalc.ts

export const getSolarElevation = (lat: number, lng: number, date: Date = new Date()): number => {
  const rad = Math.PI / 180;
  const d = (date.getTime() / 86400000) - (new Date('2000-01-01T12:00:00Z').getTime() / 86400000);
  
  const g = (357.529 + 0.98560028 * d) * rad;
  const q = (280.459 + 0.98564736 * d) * rad;
  const L = q + (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * rad;
  
  const ec = 23.439 * rad;
  const dec = Math.asin(Math.sin(ec) * Math.sin(L));
  
  const ut = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const lst = (100.46 + 0.985647 * d + lng + 15 * ut) * rad;
  const ha = lst - L; // Simplified hour angle
  
  const sinEl = Math.sin(lat * rad) * Math.sin(dec) + Math.cos(lat * rad) * Math.cos(dec) * Math.cos(ha);
  return Math.asin(sinEl) / rad;
};

export const kelvinToRGB = (kelvin: number): [number, number, number] => {
  const temp = kelvin / 100;
  let r, g, b;

  if (temp <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(temp) - 161.1195681661;
    if (temp <= 19) {
      b = 0;
    } else {
      b = 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    }
  } else {
    r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
    b = 255;
  }

  return [
    Math.min(255, Math.max(0, r)) / 255,
    Math.min(255, Math.max(0, g)) / 255,
    Math.min(255, Math.max(0, b)) / 255
  ];
};
