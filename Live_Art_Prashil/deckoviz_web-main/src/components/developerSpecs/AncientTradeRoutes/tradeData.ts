
export interface Node {
  id: string;
  name: string;
  lat: number;
  lng: number;
  peakPop: string;
  role: string;
}

export interface Route {
  id: string;
  name: string;
  nodes: string[]; // Node IDs
  startYear: number;
  endYear: number;
  goods: string;
  category: 'spice' | 'metal' | 'textile' | 'food';
  volume: number;
}

export const TRADE_NODES: Node[] = [
  { id: 'xian', name: "Xi'an", lat: 34.26, lng: 108.94, peakPop: '1,000,000', role: 'Eastern terminus' },
  { id: 'samarkand', name: "Samarkand", lat: 39.65, lng: 66.97, peakPop: '200,000', role: 'Central Silk Road Hub' },
  { id: 'baghdad', name: "Baghdad", lat: 33.31, lng: 44.36, peakPop: '1,200,000', role: 'Abbasid center' },
  { id: 'constantinople', name: "Constantinople", lat: 41.01, lng: 28.97, peakPop: '800,000', role: 'Gate to Europe' },
  { id: 'rome', name: "Rome", lat: 41.90, lng: 12.49, peakPop: '1,000,000', role: 'Imperial center' },
  { id: 'alexandria', name: "Alexandria", lat: 31.20, lng: 29.91, peakPop: '600,000', role: 'Mediterranean port' },
  { id: 'timbuktu', name: "Timbuktu", lat: 16.76, lng: -3.00, peakPop: '100,000', role: 'Trans-Saharan hub' },
  { id: 'calicut', name: "Calicut", lat: 11.25, lng: 75.78, peakPop: '150,000', role: 'Spice port' },
  { id: 'malacca', name: "Malacca", lat: 2.18, lng: 102.25, peakPop: '100,000', role: 'Maritime choke point' },
  { id: 'guangzhou', name: "Guangzhou", lat: 23.12, lng: 113.26, peakPop: '200,000', role: 'Maritime Silk Road terminal' },
  { id: 'muziris', name: "Muziris", lat: 10.15, lng: 76.21, peakPop: '50,000', role: 'Ancient spice port' },
  { id: 'petra', name: "Petra", lat: 30.32, lng: 35.44, peakPop: '30,000', role: 'Incense route hub' },
];

export const TRADE_ROUTES: Route[] = [
  { id: 'silk_road', name: 'Silk Road', nodes: ['xian', 'samarkand', 'baghdad', 'constantinople'], startYear: -200, endYear: 1450, goods: 'Silk, Porcelain', category: 'textile', volume: 0.9 },
  { id: 'spice_route', name: 'Maritime Spice Route', nodes: ['guangzhou', 'malacca', 'calicut', 'alexandria'], startYear: 100, endYear: 1500, goods: 'Pepper, Cinnamon', category: 'spice', volume: 0.8 },
  { id: 'incense_route', name: 'Incense Route', nodes: ['muziris', 'petra', 'alexandria'], startYear: -1000, endYear: 300, goods: 'Frankincense, Myrrh', category: 'spice', volume: 0.6 },
  { id: 'trans_saharan', name: 'Trans-Saharan Route', nodes: ['timbuktu', 'alexandria', 'rome'], startYear: 400, endYear: 1500, goods: 'Gold, Salt', category: 'metal', volume: 0.5 },
  { id: 'amber_road', name: 'Amber Road', nodes: ['rome', 'constantinople'], startYear: -100, endYear: 500, goods: 'Amber', category: 'metal', volume: 0.4 },
];
