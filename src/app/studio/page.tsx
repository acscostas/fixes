"use client";
import { useState } from "react";
import { useStudioStore } from "@/store/studioStore";
import { TopNav } from "@/components/layout/TopNav";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { FooterBar } from "@/components/layout/FooterBar";
import { StudioScreen } from "@/components/studio/StudioScreen";
import { AnalysisScreen } from "@/components/analisar/AnalysisScreen";
import type { Mode } from "@/types";

type Tab = "studio" | "analisar" | "hist";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("studio");
  const setMode = useStudioStore((s) => s.setMode);

  const handleTabChange = (tab: Tab) => setActiveTab(tab);

  const handleUseInStudio = (mode: Mode) => {
    setMode(mode);
    setActiveTab("studio");
  };

  const isStudio = activeTab === "studio";

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 flex overflow-hidden">
        {isStudio && <LeftPanel />}

        {activeTab === "studio" && (
          <StudioScreen onAnalyze={() => setActiveTab("analisar")} />
        )}

        {activeTab === "analisar" && (
          <AnalysisScreen onUseInStudio={handleUseInStudio} />
        )}

        {activeTab === "hist" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 opacity-30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">Histórico em breve</p>
            <p className="text-xs text-muted-foreground/70">
              Suas gerações anteriores aparecerão aqui
            </p>
          </div>
        )}
      </div>

      {isStudio && <FooterBar />}
    </div>
  );
}
