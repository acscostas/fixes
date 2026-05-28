"use client";
import { useStudioStore } from "@/store/studioStore";
import { ImageCard } from "./ImageCard";
import type { GeneratedImage } from "@/types";
import { cn } from "@/lib/utils";

interface GeneratedGalleryProps {
  onZoom: (image: GeneratedImage) => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function GeneratedGallery({ onZoom, onAnalyze }: GeneratedGalleryProps) {
  const { generatedImages, quantity } = useStudioStore();

  const gridClass = cn(
    "grid gap-4 w-full",
    quantity === 1 && "grid-cols-1 max-w-[260px] mx-auto",
    quantity === 2 && "grid-cols-2 max-w-xl mx-auto",
    quantity === 4 && "grid-cols-2 sm:grid-cols-4"
  );

  return (
    <div className={gridClass}>
      {generatedImages.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          onZoom={onZoom}
          onAnalyze={onAnalyze}
        />
      ))}
    </div>
  );
}
