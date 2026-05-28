"use client";
import { useRef, useEffect, KeyboardEvent } from "react";
import { Wand2, Loader2, Paperclip, RectangleVertical, Settings2 } from "lucide-react";
import { useStudioStore, selectAspectRatio } from "@/store/studioStore";
import {
  IconPalette, IconEstampa, IconModelo, IconMulti, IconSketch, IconFoto,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Mode, Quantity } from "@/types";
import { toast } from "sonner";

const MODES: { id: Mode; label: string; icon: React.ReactNode }[] = [
  { id: "cor",     label: "Variantes de Cor",  icon: <IconPalette className="h-3.5 w-3.5" /> },
  { id: "estampa", label: "Aplicar Estampa",   icon: <IconEstampa className="h-3.5 w-3.5" /> },
  { id: "modelo",  label: "Produto em Modelo", icon: <IconModelo className="h-3.5 w-3.5" /> },
  { id: "multi",   label: "Múltiplas Refs.",   icon: <IconMulti className="h-3.5 w-3.5" /> },
  { id: "sketch2", label: "Sketch-to-Render",  icon: <IconSketch className="h-3.5 w-3.5" /> },
  { id: "foto",    label: "Foto → Técnico",    icon: <IconFoto className="h-3.5 w-3.5" /> },
];

const QUANTITIES: Quantity[] = [1, 2, 4];

interface CommandBarProps {
  onOpenDrawer: () => void;
  onToggleDrawer: () => void;
  drawerOpen: boolean;
}

export function CommandBar({ onOpenDrawer, onToggleDrawer, drawerOpen }: CommandBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    activeMode, setMode,
    quantity, setQuantity,
    isGenerating, progress,
    startGeneration, setProgress, finishGeneration,
    lastPrompt, cycleAspectRatio,
  } = useStudioStore();

  const aspectRatio = useStudioStore(selectAspectRatio);

  const handleGenerate = () => {
    const prompt = textareaRef.current?.value.trim() ?? "";
    if (!prompt) {
      toast.error("Descreva o que você quer criar.");
      return;
    }
    startGeneration(prompt);
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 3, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(finishGeneration, 200);
      }
    }, 60);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  useEffect(() => {
    if (textareaRef.current && lastPrompt) {
      textareaRef.current.value = lastPrompt;
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-3 pb-4">
      <div className="panel rounded-xl overflow-hidden shadow-[0_-1px_0_hsl(var(--border)),0_4px_24px_rgb(0_0_0/0.08)]">

        {/* Mode chips */}
        <div
          className="flex gap-1.5 px-3 pt-2.5 pb-2.5 overflow-x-auto border-b border-[hsl(var(--border))]"
          style={{ scrollbarWidth: "none" }}
        >
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setMode(mode.id);
                if (activeMode === mode.id) {
                  onToggleDrawer();
                } else {
                  onOpenDrawer();
                }
              }}
              aria-pressed={activeMode === mode.id && drawerOpen}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all",
                activeMode === mode.id && drawerOpen
                  ? "bg-[hsl(var(--accent-primary))] text-white"
                  : "bg-[hsl(30_10%_93%)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(30_10%_89%)] hover:text-[hsl(var(--foreground))] border border-[hsl(var(--border))]"
              )}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>

        {/* Prompt textarea */}
        <div className="px-3 pt-2.5">
          <textarea
            ref={textareaRef}
            defaultValue={lastPrompt}
            onKeyDown={handleKeyDown}
            placeholder="Descreva o que você quer criar, ou use os modos acima para configurar..."
            rows={2}
            className="w-full bg-transparent text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--subtle-foreground))] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-2 px-3 pb-3">
          <button
            onClick={() => toast.info("Upload de referência em breve")}
            className="h-7 w-7 flex items-center justify-center rounded-md bg-[hsl(30_10%_93%)] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(30_10%_89%)] transition-colors"
            aria-label="Anexar referência"
          >
            <Paperclip className="h-3.5 w-3.5" />
          </button>

          {/* Quantity */}
          <div className="flex rounded-md overflow-hidden border border-[hsl(var(--border))]">
            {QUANTITIES.map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(q)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium transition-colors",
                  quantity === q
                    ? "bg-[hsl(var(--foreground))] text-white"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] bg-transparent"
                )}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Aspect ratio */}
          <button
            onClick={cycleAspectRatio}
            className="flex items-center gap-1 h-7 px-2.5 rounded-md bg-[hsl(30_10%_93%)] border border-[hsl(var(--border))] text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(30_10%_89%)] transition-colors"
          >
            <RectangleVertical className="h-3 w-3" />
            {aspectRatio}
          </button>

          {/* Advanced settings */}
          <button
            onClick={() => toast.info("Abra o painel de modo para configurações avançadas")}
            className="h-7 w-7 flex items-center justify-center rounded-md bg-[hsl(30_10%_93%)] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(30_10%_89%)] transition-colors"
            aria-label="Configurações avançadas"
          >
            <Settings2 className="h-3.5 w-3.5" />
          </button>

          {/* GERAR */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="ml-auto btn-generate flex items-center gap-2 h-8 px-5 rounded-lg text-sm font-semibold disabled:pointer-events-none"
          >
            {isGenerating
              ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Gerando…</>
              : <><Wand2 className="h-3.5 w-3.5" /> Gerar</>
            }
          </button>
        </div>

        {/* Progress bar */}
        {isGenerating && (
          <div className="h-0.5 bg-[hsl(30_10%_90%)]">
            <div
              className="h-full bg-[hsl(var(--accent-primary))] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-[hsl(var(--subtle-foreground))] mt-1.5">
        ⌘↵ para gerar
      </p>
    </div>
  );
}
