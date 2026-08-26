// src/custom.d.ts

import 'react';

declare module 'react' {
  // Augment the CSSProperties interface
  interface CSSProperties {
    '--halo-gradient'?: string;
    // You can add any other custom properties you use here
    '--halo-color-rgb'?: string;
  }
}