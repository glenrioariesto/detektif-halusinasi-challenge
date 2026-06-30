export interface Hotspot {
  x: number;      // percentage X (0-100) relative to image width
  y: number;      // percentage Y (0-100) relative to image height
  radius: number; // click tolerance radius in percentage
  label: string;  // name of the anomaly (e.g. "Jari Keenam")
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
  hotspot?: Hotspot;

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
}

export interface MissClick {
  x: number;
  y: number;
  id: number;
}

export interface GameState {
  pageView: 'splash' | 'game' | 'result';
  currentLevelIndex: number;
  score: number;
  answers: UserLevelAnswer[];
  showFeedback: boolean;
  attempts: number;
  foundHotspot: boolean;
  selectedSegmentIndex: number | null;
  missClicks: MissClick[];
}
