"use client";
import { useStudioStore } from "@/store/studioStore";

const EXAMPLE_PROMPTS = [
  "Vestido midi floral, tecido leve, tons terrosos",
  "Blazer oversized linho off-white, botões dourados",
  "Jaqueta jeans ice wash, estilo streetwear urbano",
];

const HERO_SWATCHES = [
  { label: "Jaqueta Denim",  gradient: "linear-gradient(160deg,#F0E8DC,#D9C9B4)" },
  { label: "Vestido Flora",  gradient: "linear-gradient(160deg,#D8E2EC,#C0CEDC)" },
  { label: "Blazer Linho",   gradient: "linear-gradient(160deg,#D8E0D4,#BFCDB8)" },
];

export function EmptyState() {
  const startGeneration = useStudioStore((s) => s.startGeneration);
  const setProgress     = useStudioStore((s) => s.setProgress);
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
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-10 px-4">

      {/* Hero editorial placeholders */}
      <div className="flex items-end gap-3">
        {HERO_SWATCHES.map((s, i) => (
          <div
            key={s.label}
            className="border border-[hsl(var(--border))] rounded-xl overflow-hidden shadow-sm"
            style={{
              background: s.gradient,
              width: i === 1 ? 120 : 88,
              height: i === 1 ? 160 : 120,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Text */}
      <div className="text-center max-w-xs">
        <h2 className="text-base font-semibold text-[hsl(var(--foreground))] mb-2">
          Crie sua primeira peça
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          Escolha um modo na barra abaixo, descreva o que deseja e clique em{" "}
          <span className="font-medium text-[hsl(var(--foreground))]">Gerar</span>.
        </p>
      </div>

      {/* Example prompts */}
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <p className="text-[11px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider font-medium mb-0.5">
          Sugestões
        </p>
        {EXAMPLE_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => generate(p)}
            className="w-full text-left px-3.5 py-2.5 rounded-lg border border-[hsl(var(--border))] bg-white text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--accent-primary)/0.4)] hover:bg-[hsl(30_10%_98%)] transition-all"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
