export interface Hotspot {
  x: number;          // percentage X (0-100) relative to image width
  y: number;          // percentage Y (0-100) relative to image height
  radius: number;     // legacy/fallback click tolerance radius in percentage
  radiusX?: number;   // horizontal radius in percentage
  radiusY?: number;   // vertical radius in percentage
  borderRadius?: number; // border radius percentage (0 = square, 50 = pill/circle)
  label: string;      // name of the anomaly (e.g. "Jari Keenam")
  rotation?: number;  // rotation in degrees
}

export interface Level {
  id: number;
  title: string;
  category: string;
  type: 'image' | 'text';
  description: string;
  clue: string;
  explanation: string;
  
  // Image level properties
  imageUrl?: string;
  hotspot?: Hotspot;      // Single hotspot (backward compatible)
  hotspots?: Hotspot[];   // Multiple hotspots (any hit counts as success)

  // Text level properties
  textSegments?: string[];
  correctSegmentIndex?: number;
}

export interface UserLevelAnswer {
  levelId: number;
  isCorrect: boolean;
  clickedPoint?: { x: number; y: number };
  selectedSegmentIndex?: number;
  attemptsCount: number;
  missCount?: number;
}

export interface MissClick {
  x: number;
  y: number;
  id: number;
}

export interface GameState {
  pageView: 'splash' | 'game' | 'result';
  gameMode: 'image' | 'text' | null;
  currentLevelIndex: number;
  score: number;
  totalMisses: number;
  levelMisses: number;
  answers: UserLevelAnswer[];
  showFeedback: boolean;
  attempts: number;
  foundHotspot: boolean;
  foundHotspotIndices: number[];
  selectedSegmentIndex: number | null;
  missClicks: MissClick[];
}
