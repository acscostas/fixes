"use client";
import { Download, ZoomIn, ScanLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedImage } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GRADIENT_MAP: Record<string, string> = {
  "gradient-warm":  "linear-gradient(160deg,#2a1f1a,#3d2b24)",
  "gradient-cool":  "linear-gradient(160deg,#131e2a,#1c2b3d)",
  "gradient-sage":  "linear-gradient(160deg,#141f16,#1e2f20)",
  "gradient-stone": "linear-gradient(160deg,#1f1c19,#2e2924)",
};

interface ImageCardProps {
  image: GeneratedImage;
  onZoom: (image: GeneratedImage) => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ImageCard({ image, onZoom, onAnalyze }: ImageCardProps) {
  if (!image.url) {
    return (
      <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-surface">
        <Skeleton className="w-full aspect-[3/4] rounded-none bg-surface-elevated" />
      </div>
    );
  }

  const gradient = GRADIENT_MAP[image.url] ?? GRADIENT_MAP["gradient-warm"];

  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden border border-white/[0.06] bg-surface cursor-pointer relative card-image"
      )}
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-1.5 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
        <button
          className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); onZoom(image); }}
          aria-label="Ampliar imagem"
        >
          <ZoomIn className="h-3.5 w-3.5 text-white" />
        </button>
        <button
          className="h-7 w-7 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); toast.success("Download iniciado!"); }}
          aria-label="Baixar imagem"
        >
          <Download className="h-3.5 w-3.5 text-white" />
        </button>
        <button
          className="h-7 flex items-center gap-1.5 px-2.5 rounded-lg bg-[hsl(var(--accent-primary))] text-white text-xs font-medium hover:opacity-90 transition-opacity ml-auto"
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
