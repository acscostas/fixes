export type Mode =
  | "cor"
  | "estampa"
  | "modelo"
  | "multi"
  | "sketch2"
  | "foto";

export type AspectRatio = "4:5" | "3:4" | "2:3" | "1:1" | "9:16";

export type Quantity = 1 | 2 | 4;

export interface GeneratedImage {
  id: string;
  url: string | null; // null = skeleton/loading
  prompt: string;
  createdAt: Date;
}

export interface AdvancedSettings {
  seed: string;
  guidance: number;
  steps: number;
  negativePrompt: string;
}
