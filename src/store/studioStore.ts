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
    { id: "1", url: "gradient-warm", prompt: "", createdAt: new Date() },
    { id: "2", url: "gradient-cool", prompt: "", createdAt: new Date() },
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
    const gradients = ["gradient-warm", "gradient-cool", "gradient-sage", "gradient-stone"];
    const images: GeneratedImage[] = Array.from({ length: qty }, (_, i) => ({
      id: `done-${Date.now()}-${i}`,
      url: gradients[i % gradients.length],
      prompt: get().lastPrompt,
      createdAt: new Date(),
    }));
    set({ isGenerating: false, progress: 0, generatedImages: images });
  },
  toggleAdvanced: () => set((s) => ({ showAdvanced: !s.showAdvanced })),
  setAdvanced: (partial) =>
    set((s) => ({ advanced: { ...s.advanced, ...partial } })),
}));

export const selectAspectRatio = (s: StudioState) => RATIOS[s.aspectRatioIndex];
