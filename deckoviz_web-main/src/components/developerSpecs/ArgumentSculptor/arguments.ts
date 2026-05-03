
export interface ArgumentNode {
  id: string;
  type: 'premise' | 'conclusion';
  text: string;
  weight: number;
}

export interface ArgumentEdge {
  from: string;
  to: string;
  strength: number; // 0 to 1
  type: 'dependency' | 'contradiction';
}

export interface ArgumentGraph {
  title: string;
  nodes: ArgumentNode[];
  edges: ArgumentEdge[];
}

export const CURATED_ARGUMENTS: ArgumentGraph[] = [
  {
    title: "Cogito Ergo Sum",
    nodes: [
      { id: 'p1', type: 'premise', text: "I am thinking.", weight: 1.0 },
      { id: 'p2', type: 'premise', text: "Thinking requires a thinker.", weight: 0.8 },
      { id: 'c1', type: 'conclusion', text: "I exist.", weight: 1.2 }
    ],
    edges: [
      { from: 'p1', to: 'c1', strength: 0.9, type: 'dependency' },
      { from: 'p2', to: 'c1', strength: 0.7, type: 'dependency' }
    ]
  },
  {
    title: "The Problem of Evil",
    nodes: [
      { id: 'p1', type: 'premise', text: "God is omnipotent.", weight: 0.9 },
      { id: 'p2', type: 'premise', text: "God is omnibenevolent.", weight: 0.9 },
      { id: 'p3', type: 'premise', text: "Evil exists in the world.", weight: 1.0 },
      { id: 'c1', type: 'conclusion', text: "A traditional God cannot exist.", weight: 1.1 }
    ],
    edges: [
      { from: 'p1', to: 'p2', strength: 0.5, type: 'contradiction' },
      { from: 'p2', to: 'p3', strength: 0.8, type: 'contradiction' },
      { from: 'p3', to: 'c1', strength: 0.9, type: 'dependency' }
    ]
  }
];
