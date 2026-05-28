"use client";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { IconAnalisar, IconHistory, IconGenerate } from "@/lib/icons";

type Tab = "studio" | "analisar" | "hist";

interface TopNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "studio", label: "Studio", icon: <IconGenerate className="h-3.5 w-3.5" /> },
  { id: "analisar", label: "Analisar", icon: <IconAnalisar className="h-3.5 w-3.5" /> },
  { id: "hist", label: "Histórico", icon: <IconHistory className="h-3.5 w-3.5" /> },
];

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <header className="h-11 border-b border-border flex items-stretch px-0 flex-shrink-0 bg-background">
      <div className="flex items-center px-4 pr-4 border-r border-border">
        <span className="text-sm font-bold tracking-tight text-foreground">IAzzas</span>
      </div>

      <nav className="flex items-stretch" aria-label="Navegação principal">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 px-4 text-xs font-medium border-b-2 border-t-2 border-t-transparent transition-colors",
              activeTab === tab.id
                ? "border-b-foreground text-foreground"
                : "border-b-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <div
          className="h-7 w-7 rounded-full bg-muted border border-border flex items-center justify-center text-[11px] font-semibold text-muted-foreground"
          aria-label="Usuário: MG"
        >
          MG
        </div>
      </div>
    </header>
  );
}
