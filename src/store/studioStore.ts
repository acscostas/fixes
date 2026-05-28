"use client";
import { create } from "zustand";
import type {
  Mode,
  AspectRatio,
  Quantity,
  GeneratedImage,
  AdvancedSettings,
} from "@/types";

const RATIOS: AspectRatio[] = ["4:5", "3:4", "2:3", "1:1", "9:16"];

// Curated Unsplash fashion editorial photos (portrait orientation)
const FASHION_PHOTOS = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583743814966-8d4f49f8b218?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=480&h=640&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529139738840-e05b5b47c7aa?w=480&h=640&fit=crop&q=80",
];

interface StudioState {
  activeMode: Mode;
  quantity: Quantity;
  footerQuantity: number;
  aspectRatioIndex: number;
  isGenerating: boolean;
  progress: number;
  generatedImages: GeneratedImage[];
  showAdvanced: boolean;
  advanced: AdvancedSettings;
  lastPrompt: string;

  setMode: (m: Mode) => void;
  setQuantity: (n: Quantity) => void;
  setFooterQuantity: (n: number) => void;
  cycleAspectRatio: () => void;
  startGeneration: (prompt: string) => void;
  setProgress: (p: number) => void;
  finishGeneration: () => void;
  toggleAdvanced: () => void;
  setAdvanced: (partial: Partial<AdvancedSettings>) => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  activeMode: "cor",
  quantity: 2,
  footerQuantity: 4,
  aspectRatioIndex: 0,
  isGenerating: false,
  progress: 0,
  generatedImages: [
    { id: "1", url: FASHION_PHOTOS[0], prompt: "Vestido evasê midi, seda pura, terracota", createdAt: new Date() },
    { id: "2", url: FASHION_PHOTOS[1], prompt: "Blazer oversized linho off-white, botões dourados", createdAt: new Date() },
  ],
  showAdvanced: false,
  advanced: {
    seed: "",
    guidance: 7.5,
    steps: 30,
    negativePrompt: "",
  },
  lastPrompt: "Vestido evasê midi, decote V, manga 3/4 bufante, seda pura, terracota",

  setMode: (m) => set({ activeMode: m }),
  setQuantity: (n) => set({ quantity: n }),
  setFooterQuantity: (n) =>
    set({ footerQuantity: Math.max(1, Math.min(8, n)) }),
  cycleAspectRatio: () =>
    set((s) => ({ aspectRatioIndex: (s.aspectRatioIndex + 1) % RATIOS.length })),
  startGeneration: (prompt) => {
    const qty = get().quantity;
    const skeletons: GeneratedImage[] = Array.from({ length: qty }, (_, i) => ({
      id: `gen-${Date.now()}-${i}`,
      url: null,
      prompt,
      createdAt: new Date(),
    }));
    set({ isGenerating: true, progress: 0, generatedImages: skeletons, lastPrompt: prompt });
  },
  setProgress: (p) => set({ progress: p }),
  finishGeneration: () => {
    const qty = get().quantity;
    const prompt = get().lastPrompt;
    const offset = Math.floor(Math.random() * FASHION_PHOTOS.length);
    const images: GeneratedImage[] = Array.from({ length: qty }, (_, i) => ({
      id: `done-${Date.now()}-${i}`,
      url: FASHION_PHOTOS[(offset + i) % FASHION_PHOTOS.length],
      prompt,
      createdAt: new Date(),
    }));
    set({ isGenerating: false, progress: 0, generatedImages: images });
  },
  toggleAdvanced: () => set((s) => ({ showAdvanced: !s.showAdvanced })),
  setAdvanced: (partial) =>
    set((s) => ({ advanced: { ...s.advanced, ...partial } })),
}));

export const selectAspectRatio = (s: StudioState) => RATIOS[s.aspectRatioIndex];
