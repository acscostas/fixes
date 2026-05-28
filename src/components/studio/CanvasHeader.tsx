"use client";
import { useStudioStore } from "@/store/studioStore";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

export function CanvasHeader() {
  const { generatedImages, isGenerating, quantity } = useStudioStore();
  const count = generatedImages.filter((i) => i.url !== null).length;

  return (
    <div className="h-10 border-b border-border flex items-center px-3 gap-2 flex-shrink-0 bg-background">
      <span className="text-xs text-muted-foreground">
        {isGenerating
          ? "Gerando..."
          : `${count} imagem${count !== 1 ? "ns" : ""} gerada${count !== 1 ? "s" : ""}`}
      </span>

      <div className="ml-auto flex gap-1.5">
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success("Todas baixadas!")}
          className="text-xs h-7"
        >
          <Download className="h-3.5 w-3.5 mr-1" />
          Baixar tudo
        </Button>
        <Button
          size="icon-sm"
          variant="outline"
          onClick={() => toast.success("Duplicado!")}
          aria-label="Duplicar"
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
