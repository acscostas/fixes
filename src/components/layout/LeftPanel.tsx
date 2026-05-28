"use client";
import { useStudioStore } from "@/store/studioStore";
import { ModeSelector } from "@/components/modes/ModeSelector";
import { CorForm } from "@/components/modes/CorForm";
import { EstampaForm } from "@/components/modes/EstampaForm";
import { ModeloForm } from "@/components/modes/ModeloForm";
import { MultiForm } from "@/components/modes/MultiForm";
import { SketchForm } from "@/components/modes/SketchForm";
import { FotoForm } from "@/components/modes/FotoForm";
import { AdvancedSettings } from "@/components/shared/AdvancedSettings";

const FORMS = {
  cor: CorForm,
  estampa: EstampaForm,
  modelo: ModeloForm,
  multi: MultiForm,
  sketch2: SketchForm,
  foto: FotoForm,
};

export function LeftPanel() {
  const activeMode = useStudioStore((s) => s.activeMode);
  const ActiveForm = FORMS[activeMode];

  return (
    <aside className="w-52 flex-shrink-0 border-r border-border flex flex-col overflow-hidden bg-background">
      <ModeSelector />
      <div className="flex-1 overflow-y-auto p-3">
        <ActiveForm />
      </div>
      <AdvancedSettings />
    </aside>
  );
}
