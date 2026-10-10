export type AppView = 'home' | 'details' | 'camera';

export interface VisualObject {
  id: string;
  name: string;
  emoji: string;
  realWorldSize: string;
  dimensions?: string;
  svgPath?: string;
}

export interface FoodItem {
  id: number | string;
  name: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Sweets' | 'Dairy' | 'Snacks' | 'Beverages';
  calories?: number;
  portionSize?: string;
  visualReference?: string;
  referenceIcon?: 'rect' | 'circle' | 'sphere' | 'hand';
  description?: string;
  color?: string;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  foodName: string;
  objectName: string;
  emoji: string;
  calories?: number;
  category?: string;
}
