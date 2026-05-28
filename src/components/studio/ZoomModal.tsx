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
  "gradient-warm":  "linear-gradient(160deg,#F0E8DC,#D9C9B4)",
  "gradient-cool":  "linear-gradient(160deg,#D8E2EC,#C0CEDC)",
  "gradient-sage":  "linear-gradient(160deg,#D8E0D4,#BFCDB8)",
  "gradient-stone": "linear-gradient(160deg,#E4DDD5,#CEC4B8)",
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
          <DialogTitle>Visualizar</DialogTitle>
        </DialogHeader>

        <div
          className="w-full aspect-[3/4] rounded-lg border border-[hsl(var(--border))]"
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
