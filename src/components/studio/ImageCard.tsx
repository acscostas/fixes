"use client";
import { useState } from "react";
import { Download, ZoomIn, ScanLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedImage } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FALLBACK_GRADIENTS = [
  "linear-gradient(160deg,#F0E8DC,#D9C9B4)",
  "linear-gradient(160deg,#D8E2EC,#C0CEDC)",
  "linear-gradient(160deg,#D8E0D4,#BFCDB8)",
  "linear-gradient(160deg,#E4DDD5,#CEC4B8)",
];

function hashUrl(url: string) {
  let h = 0;
  for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) >>> 0;
  return h % FALLBACK_GRADIENTS.length;
}

interface ImageCardProps {
  image: GeneratedImage;
  onZoom: (image: GeneratedImage) => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ImageCard({ image, onZoom, onAnalyze }: ImageCardProps) {
  const [imgError, setImgError] = useState(false);

  if (!image.url) {
    return (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-white">
        <Skeleton className="w-full aspect-[3/4] rounded-none bg-[hsl(30_10%_93%)]" />
      </div>
    );
  }

  const isRealUrl = image.url.startsWith("http");
  const fallbackGradient = FALLBACK_GRADIENTS[isRealUrl ? hashUrl(image.url) : 0];

  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-white cursor-pointer relative card-image"
      )}
      onClick={() => onZoom(image)}
      role="button"
      tabIndex={0}
      aria-label="Visualizar imagem"
      onKeyDown={(e) => e.key === "Enter" && onZoom(image)}
    >
      {isRealUrl && !imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={image.url}
          alt={image.prompt || "Imagem gerada"}
          className="w-full aspect-[3/4] object-cover block"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="w-full aspect-[3/4]"
          style={{ background: fallbackGradient }}
          aria-hidden="true"
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 gap-1.5 bg-gradient-to-t from-black/40 via-transparent to-transparent">
        <button
          className="h-7 w-7 rounded-lg bg-white/90 backdrop-blur-sm border border-white/60 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          onClick={(e) => { e.stopPropagation(); onZoom(image); }}
          aria-label="Ampliar imagem"
        >
          <ZoomIn className="h-3.5 w-3.5 text-[hsl(var(--foreground))]" />
        </button>
        <button
          className="h-7 w-7 rounded-lg bg-white/90 backdrop-blur-sm border border-white/60 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          onClick={(e) => { e.stopPropagation(); toast.success("Download iniciado!"); }}
          aria-label="Baixar imagem"
        >
          <Download className="h-3.5 w-3.5 text-[hsl(var(--foreground))]" />
        </button>
        <button
          className="h-7 flex items-center gap-1.5 px-2.5 rounded-lg bg-[hsl(var(--accent-primary))] text-white text-xs font-medium hover:opacity-90 transition-opacity ml-auto shadow-sm"
          onClick={(e) => { e.stopPropagation(); onAnalyze(image); }}
          aria-label="Analisar imagem"
        >
          <ScanLine className="h-3.5 w-3.5" />
          Analisar
        </button>
      </div>

      {/* Prompt caption on hover */}
      {image.prompt && (
        <div className="absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gradient-to-b from-black/30 to-transparent">
          <p className="text-white text-[10px] leading-tight line-clamp-1">{image.prompt}</p>
        </div>
      )}
    </div>
  );
}
