"use client";
import { useState } from "react";
import { Download, ScanLine, ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GeneratedImage } from "@/types";
import { toast } from "sonner";

const FALLBACK_GRADIENT = "linear-gradient(160deg,#F0E8DC,#D9C9B4)";

interface ZoomModalProps {
  image: GeneratedImage | null;
  open: boolean;
  onClose: () => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ZoomModal({ image, open, onClose, onAnalyze }: ZoomModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!image?.url) return null;

  const isRealUrl = image.url.startsWith("http");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xs p-4">
        <DialogHeader>
          <DialogTitle>{image.prompt || "Visualizar"}</DialogTitle>
        </DialogHeader>

        {isRealUrl && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.url}
            alt={image.prompt || "Imagem gerada"}
            className="w-full aspect-[3/4] object-cover rounded-lg border border-[hsl(var(--border))]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full aspect-[3/4] rounded-lg border border-[hsl(var(--border))]"
            style={{ background: FALLBACK_GRADIENT }}
            aria-label="Prévia da imagem gerada"
          />
        )}

        <div className="flex items-center justify-center gap-1.5 pt-1">
          <Button size="icon-sm" variant="outline" aria-label="Reduzir zoom">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" className="min-w-[48px] text-xs">
            100%
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Aumentar zoom">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => toast.success("Download iniciado!")}
            aria-label="Baixar imagem"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="generate"
            className="ml-1"
            onClick={() => { onClose(); onAnalyze(image); }}
          >
            <ScanLine className="h-3.5 w-3.5" />
            Analisar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
