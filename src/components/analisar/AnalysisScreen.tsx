"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScanLine, Upload, ArrowLeft, Download, FilePlus2, Palette, LayoutGrid, User, FileImage, Tag, List, Edit3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type UseMode = "cor" | "estampa" | "modelo" | "foto";

interface AnalysisScreenProps {
  onUseInStudio: (mode: UseMode) => void;
}

const KEYWORDS = [
  { id: "denim-oversized", label: "denim oversized", active: true },
  { id: "total-look", label: "total look", active: true },
  { id: "ice-wash", label: "ice wash", active: true },
  { id: "streetwear", label: "streetwear premium", active: false },
  { id: "layering", label: "layering urbano", active: true },
  { id: "bolsos", label: "bolsos chapados", active: false },
  { id: "costuras", label: "costuras aparentes", active: true },
  { id: "botoes", label: "botões metálicos", active: false },
  { id: "caimento", label: "caimento relaxado", active: false },
  { id: "espirito", label: "espírito urbano", active: true },
];

const COLORS = [
  { hex: "#8BA8C2", name: "Névoa Glacial" },
  { hex: "#F2F2F0", name: "Branco Nuvem" },
  { hex: "#B0B0A8", name: "Cinza Quartzo" },
  { hex: "#2E3A52", name: "Azul Meia-Noite" },
];

export function AnalysisScreen({ onUseInStudio }: AnalysisScreenProps) {
  const [analysisShown, setAnalysisShown] = useState(false);
  const [keywords, setKeywords] = useState(KEYWORDS);
  const [editingDesc, setEditingDesc] = useState(false);
  const [description, setDescription] = useState(
    "Jaqueta denim oversized de espírito urbano livre, lavagem ice wash em azul glacial com detalhes em branco. Construção ampla com mangas oversized, bolsos chapados com botões metálicos e costuras aparentes em linha contrastante. Caimento relaxado ideal para layering."
  );
  const [editValue, setEditValue] = useState(description);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxSize: 10 * 1024 * 1024,
    onDrop: () => {
      setTimeout(() => setAnalysisShown(true), 300);
      toast.success("Imagem analisada!");
    },
  });

  const toggleKeyword = (id: string) => {
    setKeywords((kws) =>
      kws.map((k) => (k.id === id ? { ...k, active: !k.active } : k))
    );
  };

  const handleUse = (mode: UseMode) => {
    onUseInStudio(mode);
    toast.success("Referência carregada no Studio!");
  };

  if (!analysisShown) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-5 max-w-sm text-center">
          <div className="h-14 w-14 rounded-full bg-muted border border-border flex items-center justify-center">
            <ScanLine className="h-6 w-6 text-muted-foreground" />
          </div>

          <div>
            <h2 className="text-base font-semibold mb-1.5">Análise de imagem</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Faça upload de uma peça para extrair cores, palavras-chave, descrição e atributos automaticamente.
            </p>
          </div>

          <div
            {...getRootProps()}
            className={cn(
              "w-full border-2 border-dashed rounded-lg p-7 cursor-pointer transition-all",
              isDragActive
                ? "border-foreground bg-muted"
                : "border-border hover:border-muted-foreground"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Clique ou arraste para fazer upload</p>
              <p className="text-xs text-muted-foreground/70">JPG, PNG, WEBP — até 10MB</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setAnalysisShown(true)}
          >
            <ScanLine className="h-3.5 w-3.5 mr-1.5" />
            Ver demo com imagem de exemplo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-10 border-b border-border flex items-center px-3 gap-2 flex-shrink-0 bg-background">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setAnalysisShown(false)}
          className="h-7 text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Nova imagem
        </Button>
        <span className="text-xs text-muted-foreground">
          Jaqueta Denim Oversized — analisada agora
        </span>
        <div className="ml-auto flex gap-1.5">
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Exportado!")}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Exportar
          </Button>
          <Button size="sm" variant="default" className="h-7 text-xs" onClick={() => toast.success("Ficha técnica criada!")}>
            <FilePlus2 className="h-3.5 w-3.5 mr-1" />
            Criar ficha técnica
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <div className="w-48 flex-shrink-0 border-r border-border p-3 flex flex-col gap-4 overflow-y-auto bg-background">
          {/* Image preview */}
          <div
            className="w-full aspect-[3/4] rounded-md overflow-hidden border border-border relative"
            style={{ background: "linear-gradient(160deg,#c8d8e8,#dce8f4)" }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-[11px] font-semibold text-white leading-tight">
                Jaqueta Denim Oversized
              </p>
            </div>
          </div>

          {/* Color palette */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Cartela de cores
            </p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-1">
                  <div
                    className="h-8 w-8 rounded-full border border-border"
                    style={{ background: c.hex }}
                    aria-label={c.name}
                  />
                  <span className="text-[9px] text-muted-foreground text-center leading-tight max-w-[36px]">
                    {c.name}
                  </span>
                  <span className="text-[9px] text-muted-foreground/70 font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use in Studio */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Usar no Studio
            </p>
            <div className="flex flex-col gap-1.5">
              <Button size="sm" variant="outline" className="w-full justify-start text-xs h-7" onClick={() => handleUse("cor")}>
                <Palette className="h-3.5 w-3.5 mr-1.5" /> Variante de cor
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start text-xs h-7" onClick={() => handleUse("estampa")}>
                <LayoutGrid className="h-3.5 w-3.5 mr-1.5" /> Aplicar estampa
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start text-xs h-7" onClick={() => handleUse("modelo")}>
                <User className="h-3.5 w-3.5 mr-1.5" /> Produto em modelo
              </Button>
              <Button size="sm" variant="outline" className="w-full justify-start text-xs h-7" onClick={() => handleUse("foto")}>
                <FileImage className="h-3.5 w-3.5 mr-1.5" /> Desenho técnico
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 bg-[hsl(var(--background-content))]">
          {/* Description card */}
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/30">
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
                Descrição gerada
              </span>
              {!editingDesc ? (
                <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => { setEditValue(description); setEditingDesc(true); }}>
                  <Edit3 className="h-3 w-3 mr-1" /> Editar
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button size="sm" variant="default" className="h-6 text-xs" onClick={() => { setDescription(editValue); setEditingDesc(false); toast.success("Descrição salva!"); }}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => setEditingDesc(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="p-3">
              {editingDesc ? (
                <textarea
                  className="w-full text-sm leading-relaxed text-foreground bg-background border border-input rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                  rows={4}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-sm leading-relaxed text-foreground">{description}</p>
              )}
            </div>
          </div>

          {/* Keywords card */}
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/30">
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Palavras-chave
              </span>
              <span className="text-[10px] text-muted-foreground">Clique para selecionar</span>
            </div>
            <div className="p-3 flex flex-wrap gap-1.5">
              {keywords.map((kw) => (
                <button
                  key={kw.id}
                  onClick={() => toggleKeyword(kw.id)}
                  aria-pressed={kw.active}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs border transition-colors",
                    kw.active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:border-muted-foreground"
                  )}
                >
                  {kw.label}
                </button>
              ))}
            </div>
          </div>

          {/* Attributes card */}
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <div className="flex items-center px-3 py-2.5 border-b border-border bg-muted/30">
              <span className="flex items-center gap-1.5 text-xs font-semibold">
                <List className="h-3.5 w-3.5 text-muted-foreground" />
                Atributos extraídos
              </span>
            </div>
            <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                { label: "Tipo", value: "Jaqueta" },
                { label: "Silhueta", value: "Oversized" },
                { label: "Tecido", value: "Denim" },
                { label: "Lavagem", value: "Ice wash" },
                { label: "Gênero", value: "Unissex" },
                { label: "Estilo", value: "Streetwear" },
              ].map((attr) => (
                <div key={attr.label}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                    {attr.label}
                  </p>
                  <p className="text-sm text-foreground">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-lg border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground mb-2">
              O que fazer com isso? → Explorar cor, design, estampa e acervo
            </p>
            <div className="flex gap-1.5 flex-wrap">
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleUse("cor")}>
                <Palette className="h-3.5 w-3.5 mr-1" /> Variante de cor
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleUse("estampa")}>
                <LayoutGrid className="h-3.5 w-3.5 mr-1" /> Estampa
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => handleUse("foto")}>
                <FileImage className="h-3.5 w-3.5 mr-1" /> Desenho técnico
              </Button>
              <Button size="sm" variant="default" className="text-xs h-7" onClick={() => toast.success("Criando ficha técnica...")}>
                <FilePlus2 className="h-3.5 w-3.5 mr-1" /> Ficha técnica
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
