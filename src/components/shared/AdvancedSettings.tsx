"use client";
import { Settings2, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudioStore } from "@/store/studioStore";
import { cn } from "@/lib/utils";

export function AdvancedSettings() {
  const { showAdvanced, advanced, toggleAdvanced, setAdvanced } = useStudioStore();

  return (
    <Collapsible open={showAdvanced} onOpenChange={toggleAdvanced}>
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
        <span className="flex items-center gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          Avançado
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            showAdvanced && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="adv-seed" className="text-xs text-[hsl(var(--muted-foreground))]">Seed</Label>
            <Input
              id="adv-seed"
              placeholder="Aleatório"
              value={advanced.seed}
              onChange={(e) => setAdvanced({ seed: e.target.value })}
              className="text-xs h-7"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-guidance" className="text-xs text-[hsl(var(--muted-foreground))]">Guidance</Label>
            <Input
              id="adv-guidance"
              type="number"
              step={0.5}
              value={advanced.guidance}
              onChange={(e) => setAdvanced({ guidance: parseFloat(e.target.value) })}
              className="text-xs h-7"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-steps" className="text-xs text-[hsl(var(--muted-foreground))]">Steps</Label>
            <Input
              id="adv-steps"
              type="number"
              value={advanced.steps}
              onChange={(e) => setAdvanced({ steps: parseInt(e.target.value) })}
              className="text-xs h-7"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="adv-neg" className="text-xs text-[hsl(var(--muted-foreground))]">Neg. prompt</Label>
            <Input
              id="adv-neg"
              placeholder="blurry, distorted"
              value={advanced.negativePrompt}
              onChange={(e) => setAdvanced({ negativePrompt: e.target.value })}
              className="text-xs h-7"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
