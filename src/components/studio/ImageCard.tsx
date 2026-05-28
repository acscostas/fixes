"use client";
import { Download, ZoomIn, ScanLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedImage } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GRADIENT_MAP: Record<string, string> = {
  "gradient-warm": "linear-gradient(160deg,#f0ebe6,#e4ddd5)",
  "gradient-cool": "linear-gradient(160deg,#e0e8f0,#d4dfe8)",
  "gradient-sage": "linear-gradient(160deg,#e2ebe4,#d4e0d6)",
  "gradient-stone": "linear-gradient(160deg,#ede9e4,#e0dbd5)",
};

interface ImageCardProps {
  image: GeneratedImage;
  onZoom: (image: GeneratedImage) => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ImageCard({ image, onZoom, onAnalyze }: ImageCardProps) {
  if (!image.url) {
    return (
      <div className="rounded-lg overflow-hidden border border-border bg-card">
        <Skeleton className="w-full aspect-[3/4] rounded-none" />
      </div>
    );
  }

  const gradient = GRADIENT_MAP[image.url] ?? "linear-gradient(160deg,#f0ebe6,#e4ddd5)";

  return (
    <div
      className="group rounded-lg overflow-hidden border border-border bg-card cursor-pointer relative transition-shadow hover:shadow-md"
      onClick={() => onZoom(image)}
      role="button"
      tabIndex={0}
      aria-label="Visualizar imagem"
      onKeyDown={(e) => e.key === "Enter" && onZoom(image)}
    >
      <div
        className="w-full aspect-[3/4]"
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-1.5 bg-gradient-to-t from-black/20 via-transparent to-transparent">
        <button
          className="h-7 w-7 rounded-md bg-white/90 border border-white/20 flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onZoom(image); }}
          aria-label="Ampliar imagem"
        >
          <ZoomIn className="h-3.5 w-3.5 text-foreground" />
        </button>
        <button
          className="h-7 w-7 rounded-md bg-white/90 border border-white/20 flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => { e.stopPropagation(); toast.success("Download iniciado!"); }}
          aria-label="Baixar imagem"
        >
          <Download className="h-3.5 w-3.5 text-foreground" />
        </button>
        <button
          className="h-7 flex items-center gap-1.5 px-2.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors ml-auto"
          onClick={(e) => { e.stopPropagation(); onAnalyze(image); }}
          aria-label="Analisar imagem"
        >
          <ScanLine className="h-3.5 w-3.5" />
          Analisar
        </button>
      </div>
    </div>
  );
}
