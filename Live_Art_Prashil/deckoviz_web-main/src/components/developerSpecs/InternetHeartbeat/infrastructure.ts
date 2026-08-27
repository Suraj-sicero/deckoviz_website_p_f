
export interface IXPNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  throughput: number; // Gbps
}

export interface SubseaCable {
  id: string;
  name: string;
  nodes: [string, string];
  capacity: number; // Tbps
  operator: string;
  load: number; // 0 to 1
}

export const IXP_NODES: IXPNode[] = [
  { id: 'nyc', name: 'New York - DE-CIX', lat: 40.7128, lng: -74.0060, throughput: 1200 },
  { id: 'lon', name: 'London - LINX', lat: 51.5074, lng: -0.1278, throughput: 2500 },
  { id: 'ams', name: 'Amsterdam - AMS-IX', lat: 52.3676, lng: 4.9041, throughput: 3100 },
  { id: 'hkg', name: 'Hong Kong - HKIX', lat: 22.3193, lng: 114.1694, throughput: 1800 },
  { id: 'syd', name: 'Sydney - Equinix', lat: -33.8688, lng: 151.2093, throughput: 800 },
  { id: 'sfo', name: 'San Francisco - Equinix', lat: 37.7749, lng: -122.4194, throughput: 1400 },
  { id: 'sin', name: 'Singapore - Equinix', lat: 1.3521, lng: 103.8198, throughput: 2100 },
  { id: 'fra', name: 'Frankfurt - DE-CIX', lat: 50.1109, lng: 8.6821, throughput: 3500 },
  { id: 'tky', name: 'Tokyo - JPIX', lat: 35.6762, lng: 139.6503, throughput: 2400 },
  { id: 'mum', name: 'Mumbai - NIXI', lat: 19.0760, lng: 72.8777, throughput: 900 },
];

export const SUBSEA_CABLES: SubseaCable[] = [
  { id: 'tat14', name: 'TAT-14', nodes: ['nyc', 'lon'], capacity: 60, operator: 'Consortium', load: 0.8 },
  { id: 'apollo', name: 'Apollo', nodes: ['nyc', 'lon'], capacity: 40, operator: 'Vodafone', load: 0.6 },
  { id: 'ac1', name: 'Atlantic Crossing 1', nodes: ['nyc', 'ams'], capacity: 80, operator: 'Global Cloud', load: 0.7 },
  { id: 'sea-me-we-5', name: 'SEA-ME-WE 5', nodes: ['fra', 'mum'], capacity: 24, operator: 'Consortium', load: 0.9 },
  { id: 'smw5_2', name: 'SEA-ME-WE 5 Ext', nodes: ['mum', 'sin'], capacity: 24, operator: 'Consortium', load: 0.85 },
  { id: 'aag', name: 'Asia-America Gateway', nodes: ['hkg', 'sfo'], capacity: 20, operator: 'Consortium', load: 0.5 },
  { id: 'unity', name: 'Unity', nodes: ['tky', 'sfo'], capacity: 30, operator: 'Google/KDDI', load: 0.75 },
  { id: 'indigo', name: 'INDIGO-West', nodes: ['sin', 'syd'], capacity: 36, operator: 'Google/Indosat', load: 0.4 },
  { id: 'h2', name: 'H2', nodes: ['hkg', 'tky'], capacity: 50, operator: 'H2 Cable', load: 0.65 },
  { id: 'tgn-ia', name: 'TGN-IA', nodes: ['sin', 'hkg'], capacity: 28, operator: 'Tata Communications', load: 0.8 },
];
