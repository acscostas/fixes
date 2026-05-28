"use client";
import { X } from "lucide-react";
import { useStudioStore } from "@/store/studioStore";
import { AdvancedSettings } from "@/components/shared/AdvancedSettings";
import { CorForm } from "@/components/modes/CorForm";
import { EstampaForm } from "@/components/modes/EstampaForm";
import { ModeloForm } from "@/components/modes/ModeloForm";
import { MultiForm } from "@/components/modes/MultiForm";
import { SketchForm } from "@/components/modes/SketchForm";
import { FotoForm } from "@/components/modes/FotoForm";
import { cn } from "@/lib/utils";
import type { Mode } from "@/types";

const MODE_LABELS: Record<Mode, string> = {
  cor:     "Variantes de Cor",
  estampa: "Aplicar Estampa",
  modelo:  "Produto em Modelo",
  multi:   "Múltiplas Refs.",
  sketch2: "Sketch-to-Render",
  foto:    "Foto → Técnico",
};

function ActiveForm({ mode }: { mode: Mode }) {
  switch (mode) {
    case "cor":     return <CorForm />;
    case "estampa": return <EstampaForm />;
    case "modelo":  return <ModeloForm />;
    case "multi":   return <MultiForm />;
    case "sketch2": return <SketchForm />;
    case "foto":    return <FotoForm />;
  }
}

interface ModeDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ModeDrawer({ open, onClose }: ModeDrawerProps) {
  const activeMode = useStudioStore((s) => s.activeMode);

  return (
    <aside
      className={cn(
        "absolute left-0 top-0 bottom-0 w-72 z-40 flex flex-col bg-white",
        "border-r border-[hsl(var(--border))] shadow-[2px_0_12px_rgb(0_0_0/0.06)]",
        "transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "-translate-x-full"
      )}
      aria-hidden={!open}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))] flex-shrink-0">
        <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
          {MODE_LABELS[activeMode]}
        </span>
        <button
          onClick={onClose}
          className="h-6 w-6 flex items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(30_10%_93%)] transition-colors"
          aria-label="Fechar painel"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto p-4">
        <ActiveForm mode={activeMode} />
      </div>

      {/* Advanced settings */}
      <div className="flex-shrink-0 border-t border-[hsl(var(--border))]">
        <AdvancedSettings />
      </div>
    </aside>
  );
}
