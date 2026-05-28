"use client";
import { useState } from "react";
import { useStudioStore } from "@/store/studioStore";
import { TopNav } from "@/components/layout/TopNav";
import { CommandBar } from "@/components/layout/CommandBar";
import { ModeDrawer } from "@/components/layout/ModeDrawer";
import { StudioScreen } from "@/components/studio/StudioScreen";
import { AnalysisScreen } from "@/components/analisar/AnalysisScreen";
import { Sparkles } from "lucide-react";
import type { Mode } from "@/types";

type Tab = "studio" | "analisar" | "hist";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("studio");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const setMode = useStudioStore((s) => s.setMode);

  const handleUseInStudio = (mode: Mode) => {
    setMode(mode);
    setDrawerOpen(true);
    setActiveTab("studio");
  };

  const isStudio = activeTab === "studio";

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 relative overflow-hidden">
        {isStudio && (
          <>
            {/* Backdrop — click closes drawer */}
            {drawerOpen && (
              <div
                className="absolute inset-0 z-[35] bg-black/20"
                onClick={() => setDrawerOpen(false)}
              />
            )}

            <ModeDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            />

            <StudioScreen onAnalyze={() => setActiveTab("analisar")} />

            <CommandBar
              onOpenDrawer={() => setDrawerOpen(true)}
              onToggleDrawer={() => setDrawerOpen((v) => !v)}
              drawerOpen={drawerOpen}
            />
          </>
        )}

        {activeTab === "analisar" && (
          <AnalysisScreen onUseInStudio={handleUseInStudio} />
        )}

        {activeTab === "hist" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 h-full text-muted-foreground">
            <div className="h-12 w-12 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
              <Sparkles className="h-5 w-5 opacity-40" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white/70">Histórico em breve</p>
              <p className="text-xs text-muted-foreground mt-1">
                Suas gerações anteriores aparecerão aqui
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
