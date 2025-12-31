
export type SceneryType = 
  | 'seed' 
  | 'mountain-night' 
  | 'rainy-lake' 
  | 'sprout' 
  | 'misty-forest' 
  | 'stormy-sea' 
  | 'meadow-path' 
  | 'sunrise-hills' 
  | 'golden-field' 
  | 'holding-flower';

export interface StampData {
  id: number;
  text: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  scenery: SceneryType;
  hasPlaid?: boolean;
  rotation?: number;
}
