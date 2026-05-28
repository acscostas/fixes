"use client";
import { useState } from "react";
import { useStudioStore } from "@/store/studioStore";
import { GeneratedGallery } from "./GeneratedGallery";
import { ZoomModal } from "./ZoomModal";
import { EmptyState } from "./EmptyState";
import type { GeneratedImage } from "@/types";

interface StudioScreenProps {
  onAnalyze: () => void;
}

export function StudioScreen({ onAnalyze }: StudioScreenProps) {
  const [zoomImage, setZoomImage] = useState<GeneratedImage | null>(null);
  const generatedImages = useStudioStore((s) => s.generatedImages);

  const handleAnalyze = (_image: GeneratedImage) => {
    setZoomImage(null);
    onAnalyze();
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[hsl(var(--background-content))]">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-[200px]">
        {generatedImages.length === 0 ? (
          <EmptyState />
        ) : (
          <GeneratedGallery onZoom={setZoomImage} onAnalyze={handleAnalyze} />
        )}
      </div>

      <ZoomModal
        image={zoomImage}
        open={!!zoomImage}
        onClose={() => setZoomImage(null)}
        onAnalyze={handleAnalyze}
      />
    </div>
  );
}
