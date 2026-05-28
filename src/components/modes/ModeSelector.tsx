"use client";
import { useStudioStore } from "@/store/studioStore";
import {
  IconPalette,
  IconEstampa,
  IconModelo,
  IconMulti,
  IconSketch,
  IconFoto,
} from "@/lib/icons";
import type { Mode } from "@/types";
import { cn } from "@/lib/utils";

const MODES: { id: Mode; label: string; icon: React.ReactNode }[] = [
  { id: "cor", label: "Variantes de Cor", icon: <IconPalette className="h-4 w-4 flex-shrink-0" /> },
  { id: "estampa", label: "Aplicar Estampa", icon: <IconEstampa className="h-4 w-4 flex-shrink-0" /> },
  { id: "modelo", label: "Produto em Modelo", icon: <IconModelo className="h-4 w-4 flex-shrink-0" /> },
  { id: "multi", label: "Múltiplas Refs.", icon: <IconMulti className="h-4 w-4 flex-shrink-0" /> },
  { id: "sketch2", label: "Sketch-to-Render", icon: <IconSketch className="h-4 w-4 flex-shrink-0" /> },
  { id: "foto", label: "Foto → Técnico", icon: <IconFoto className="h-4 w-4 flex-shrink-0" /> },
];

export function ModeSelector() {
  const { activeMode, setMode } = useStudioStore();

  return (
    <nav className="p-2 border-b border-border flex flex-col gap-0.5" aria-label="Modo de geração">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          aria-current={activeMode === m.id ? "page" : undefined}
          className={cn(
            "flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-left w-full transition-colors",
            activeMode === m.id
              ? "bg-foreground text-background font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {m.icon}
          {m.label}
        </button>
      ))}
    </nav>
  );
}
