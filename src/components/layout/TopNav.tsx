"use client";
import { cn } from "@/lib/utils";
import { IconAnalisar, IconHistory, IconGenerate } from "@/lib/icons";

type Tab = "studio" | "analisar" | "hist";

interface TopNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "studio",   label: "Studio",    icon: <IconGenerate className="h-3.5 w-3.5" /> },
  { id: "analisar", label: "Analisar",  icon: <IconAnalisar className="h-3.5 w-3.5" /> },
  { id: "hist",     label: "Histórico", icon: <IconHistory className="h-3.5 w-3.5" /> },
];

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <header className="h-12 flex items-stretch flex-shrink-0 bg-white border-b border-[hsl(var(--border))] relative z-50">
      <div className="flex items-center px-5 border-r border-[hsl(var(--border))]">
        <span className="text-sm font-bold tracking-tight text-[hsl(var(--foreground))]">
          IAzzas
          <span className="ml-0.5 text-[hsl(var(--accent-primary))]">·</span>
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
                ? "border-b-[hsl(var(--accent-primary))] text-[hsl(var(--foreground))]"
                : "border-b-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <div
          className="h-7 w-7 rounded-full bg-[hsl(30_10%_93%)] border border-[hsl(var(--border))] flex items-center justify-center text-[11px] font-semibold text-[hsl(var(--foreground))]"
          aria-label="Usuário: MG"
        >
          MG
        </div>
      </div>
    </header>
  );
}
