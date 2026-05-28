"use client";
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

const GRADIENT_MAP: Record<string, string> = {
  "gradient-warm":  "linear-gradient(160deg,#2a1f1a,#3d2b24)",
  "gradient-cool":  "linear-gradient(160deg,#131e2a,#1c2b3d)",
  "gradient-sage":  "linear-gradient(160deg,#141f16,#1e2f20)",
  "gradient-stone": "linear-gradient(160deg,#1f1c19,#2e2924)",
};

interface ZoomModalProps {
  image: GeneratedImage | null;
  open: boolean;
  onClose: () => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ZoomModal({ image, open, onClose, onAnalyze }: ZoomModalProps) {
  if (!image?.url) return null;

  const gradient = GRADIENT_MAP[image.url] ?? GRADIENT_MAP["gradient-warm"];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xs p-4">
        <DialogHeader>
          <DialogTitle className="text-white">Visualizar</DialogTitle>
        </DialogHeader>

        <div
          className="w-full aspect-[3/4] rounded-lg border border-white/[0.06]"
          style={{ background: gradient }}
          aria-label="Prévia da imagem gerada"
        />

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
