"use client";
import { useRef, useEffect } from "react";
import { useStudioStore } from "@/store/studioStore";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw, ClipboardPaste, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Qty = 1 | 2 | 4;

export function DockPanel() {
  const {
    isGenerating,
    progress,
    quantity,
    setQuantity,
    startGeneration,
    finishGeneration,
    setProgress,
    lastPrompt,
  } = useStudioStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const genTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-resize textarea
  const handleInput = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    const prompt = textareaRef.current?.value ?? "";
    startGeneration(prompt);

    let p = 0;
    genTimerRef.current = setInterval(() => {
      p = Math.min(p + 3, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(genTimerRef.current!);
        setTimeout(() => {
          finishGeneration();
          toast.success(`${quantity} imagem${quantity > 1 ? "ns" : ""} gerada${quantity > 1 ? "s" : ""}!`);
        }, 200);
      }
    }, 60);
  };

  const handleReusePrompt = () => {
    if (textareaRef.current) {
      textareaRef.current.value = lastPrompt;
      handleInput();
      toast("Último prompt restaurado");
    }
  };

  useEffect(() => {
    return () => {
      if (genTimerRef.current) clearInterval(genTimerRef.current);
    };
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleGenerate();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div className="p-3 flex-shrink-0 bg-background border-t border-border">
      {/* Progress */}
      {isGenerating && (
        <div className="mb-3">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Gerando...</span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      {/* Prompt box */}
      <div className="rounded-lg border border-border overflow-hidden focus-within:ring-1 focus-within:ring-ring transition-shadow">
        <textarea
          ref={textareaRef}
          className="w-full px-3 pt-3 pb-2 text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none resize-none leading-relaxed"
          placeholder="Descreva o que você quer criar, ou use o formulário ao lado..."
          defaultValue={lastPrompt}
          rows={2}
          onInput={handleInput}
          aria-label="Prompt de geração"
        />

        <div className="flex items-center px-2 py-1.5 bg-muted/50 gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReusePrompt}
            className="text-muted-foreground hover:text-foreground text-xs h-7 px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Último
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast("Cole com Ctrl+V")}
            className="text-muted-foreground hover:text-foreground text-xs h-7 px-2"
          >
            <ClipboardPaste className="h-3 w-3 mr-1" />
            Colar ref
          </Button>

          <div className="ml-auto flex items-center gap-1.5">
            {/* Quantity segmented control */}
            <div
              className="flex rounded-md border border-border overflow-hidden bg-background"
              role="group"
              aria-label="Quantidade de imagens"
            >
              {([1, 2, 4] as Qty[]).map((n) => (
                <button
                  key={n}
                  onClick={() => setQuantity(n)}
                  aria-pressed={quantity === n}
                  className={cn(
                    "w-8 h-7 text-xs font-semibold transition-colors",
                    quantity === n
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    n !== 1 && "border-l border-border"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="h-7 px-4 font-semibold"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
              ) : (
                <Wand2 className="h-3.5 w-3.5 mr-1" />
              )}
              {isGenerating ? "Gerando..." : "Gerar"}
            </Button>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground mt-1.5 text-right">
        <kbd className="font-mono">⌘↵</kbd> para gerar
      </p>
    </div>
  );
}
