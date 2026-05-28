"use client";
import { cn } from "@/lib/utils";
import { IconAnalisar, IconHistory, IconGenerate } from "@/lib/icons";

type Tab = "studio" | "analisar" | "hist";

interface TopNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "studio",  label: "Studio",   icon: <IconGenerate className="h-3.5 w-3.5" /> },
  { id: "analisar",label: "Analisar", icon: <IconAnalisar className="h-3.5 w-3.5" /> },
  { id: "hist",    label: "Histórico",icon: <IconHistory className="h-3.5 w-3.5" /> },
];

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <header className="h-12 flex items-stretch px-0 flex-shrink-0 bg-black/40 backdrop-blur-xl border-b border-white/[0.06] relative z-50">
      <div className="flex items-center px-5 border-r border-white/[0.06]">
        <span className="text-sm font-bold tracking-tight text-white">
          IAzzas
          <span className="ml-1 text-[hsl(var(--accent-primary))]">·</span>
        </span>
      </div>

      <nav className="flex items-stretch" aria-label="Navegação principal">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 px-4 text-xs font-medium border-b-2 border-t-2 border-t-transparent transition-all",
              activeTab === tab.id
                ? "border-b-[hsl(var(--accent-primary))] text-white"
                : "border-b-transparent text-muted-foreground hover:text-white hover:border-b-white/[0.2]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <div
          className="h-7 w-7 rounded-full bg-[hsl(var(--surface-elevated))] border border-white/[0.10] flex items-center justify-center text-[11px] font-semibold text-white"
          aria-label="Usuário: MG"
        >
          MG
        </div>
      </div>
    </header>
  );
}
