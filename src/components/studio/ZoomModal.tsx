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
  "gradient-warm": "linear-gradient(160deg,#f0ebe6,#e4ddd5)",
  "gradient-cool": "linear-gradient(160deg,#e0e8f0,#d4dfe8)",
  "gradient-sage": "linear-gradient(160deg,#e2ebe4,#d4e0d6)",
  "gradient-stone": "linear-gradient(160deg,#ede9e4,#e0dbd5)",
};

interface ZoomModalProps {
  image: GeneratedImage | null;
  open: boolean;
  onClose: () => void;
  onAnalyze: (image: GeneratedImage) => void;
}

export function ZoomModal({ image, open, onClose, onAnalyze }: ZoomModalProps) {
  if (!image?.url) return null;

  const gradient = GRADIENT_MAP[image.url] ?? "linear-gradient(160deg,#f0ebe6,#e4ddd5)";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xs p-4">
        <DialogHeader>
          <DialogTitle>Visualizar</DialogTitle>
        </DialogHeader>

        <div
          className="w-full aspect-[3/4] rounded-md"
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
            variant="default"
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
