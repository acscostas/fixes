"use client";
import { useState } from "react";
import { CanvasHeader } from "./CanvasHeader";
import { GeneratedGallery } from "./GeneratedGallery";
import { DockPanel } from "./DockPanel";
import { ZoomModal } from "./ZoomModal";
import type { GeneratedImage } from "@/types";

interface StudioScreenProps {
  onAnalyze: () => void;
}

export function StudioScreen({ onAnalyze }: StudioScreenProps) {
  const [zoomImage, setZoomImage] = useState<GeneratedImage | null>(null);

  const handleAnalyze = (_image: GeneratedImage) => {
    setZoomImage(null);
    onAnalyze();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[hsl(var(--background-content))]">
      <CanvasHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <GeneratedGallery
          onZoom={setZoomImage}
          onAnalyze={handleAnalyze}
        />
      </div>

      <DockPanel />

      <ZoomModal
        image={zoomImage}
        open={!!zoomImage}
        onClose={() => setZoomImage(null)}
        onAnalyze={handleAnalyze}
      />
    </div>
  );
}
