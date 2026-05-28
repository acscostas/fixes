"use client";
import { Sparkles } from "lucide-react";
import { useStudioStore } from "@/store/studioStore";

const EXAMPLE_PROMPTS = [
  "Vestido midi floral, tecido leve, tons terrosos",
  "Blazer oversized linho off-white, botões dourados",
  "Jaqueta jeans ice wash, estilo streetwear urbano",
];

export function EmptyState() {
  const lastPrompt = useStudioStore((s) => s.lastPrompt);
  const startGeneration = useStudioStore((s) => s.startGeneration);
  const setProgress = useStudioStore((s) => s.setProgress);
  const finishGeneration = useStudioStore((s) => s.finishGeneration);

  const generate = (prompt: string) => {
    startGeneration(prompt);
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + 4, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(finishGeneration, 200);
      }
    }, 60);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 px-6 text-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(271 81% 45%), hsl(291 81% 66%))" }}>
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl blur-xl opacity-40"
          style={{ background: "linear-gradient(135deg, hsl(271 81% 45%), hsl(291 81% 66%))" }} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-2">Comece criando</h2>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Escolha um modo na barra abaixo, descreva o que deseja criar e clique em Gerar.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-sm">
        <p className="text-xs text-muted-foreground mb-1">Exemplos de prompt:</p>
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => generate(p)}
            className="w-full text-left px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs text-muted-foreground hover:text-white hover:border-white/[0.14] hover:bg-white/[0.06] transition-all"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
