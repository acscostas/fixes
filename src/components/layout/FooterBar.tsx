"use client";
import { useStudioStore, selectAspectRatio } from "@/store/studioStore";
import { Cpu } from "lucide-react";
import { IconMinus, IconPlus, IconRatio } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function FooterBar() {
  const footerQuantity = useStudioStore((s) => s.footerQuantity);
  const setFooterQuantity = useStudioStore((s) => s.setFooterQuantity);
  const cycleAspectRatio = useStudioStore((s) => s.cycleAspectRatio);
  const aspectRatio = useStudioStore(selectAspectRatio);

  return (
    <footer className="h-11 border-t border-border flex items-center px-3 gap-2 flex-shrink-0 bg-background">
      {/* Quantity spinner */}
      <div className="flex items-center border border-border rounded-md overflow-hidden" aria-label="Quantidade de imagens">
        <button
          onClick={() => setFooterQuantity(footerQuantity - 1)}
          disabled={footerQuantity <= 1}
          className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-40 transition-colors"
          aria-label="Diminuir quantidade"
        >
          <IconMinus className="h-3 w-3" />
        </button>
        <span className="min-w-[28px] text-center text-xs font-semibold border-x border-border leading-7">
          {footerQuantity}
        </span>
        <button
          onClick={() => setFooterQuantity(footerQuantity + 1)}
          disabled={footerQuantity >= 8}
          className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-40 transition-colors"
          aria-label="Aumentar quantidade"
        >
          <IconPlus className="h-3 w-3" />
        </button>
      </div>

      {/* Aspect ratio */}
      <button
        onClick={cycleAspectRatio}
        className="flex items-center gap-1.5 h-7 px-3 rounded-md border border-border text-xs text-foreground hover:bg-muted transition-colors"
        aria-label={`Proporção: ${aspectRatio}`}
      >
        <IconRatio className="h-3.5 w-3.5" />
        <span>{aspectRatio}</span>
      </button>

      {/* Resolution */}
      <button className="flex items-center gap-1.5 h-7 px-3 rounded-md border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
        2K
      </button>

      {/* Model selector */}
      <button className="flex items-center gap-1.5 h-7 px-3 rounded-md border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
        <Cpu className="h-3.5 w-3.5" />
        Automático
      </button>
    </footer>
  );
}
