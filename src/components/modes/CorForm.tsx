"use client";
import { useState } from "react";
import { Image as ImageIcon, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";

export function CorForm() {
  const [colorway, setColorway] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [notas, setNotas] = useState("");
  const [refProduto, setRefProduto] = useState<File | null>(null);
  const [refCor, setRefCor] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const uploadCount = [refProduto, refCor].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Variantes de Cor</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Mude o colorway preservando silhueta e construção.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cor-colorway">
          Colorway desejado <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Input
          id="cor-colorway"
          placeholder="dusty rose, cobalt blue, all-black"
          value={colorway}
          onChange={(e) => setColorway(e.target.value)}
          onBlur={() => setTouched(true)}
          className={touched && !colorway ? "border-destructive focus-visible:ring-destructive" : ""}
        />
        {touched && !colorway && (
          <p className="text-[10px] text-destructive">Informe o colorway desejado</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cor-detalhes">Detalhes a preservar</Label>
        <Input
          id="cor-detalhes"
          placeholder="bordados, estampa, rebites"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cor-notas">Notas adicionais</Label>
        <Input
          id="cor-notas"
          placeholder="manter fundo neutro de estúdio"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Referências
          </span>
          <span className="text-[10px] text-muted-foreground">{uploadCount}/2</span>
        </div>
        <div className="flex gap-3">
          <ReferenceUpload
            label="Produto"
            required
            value={refProduto}
            onChange={setRefProduto}
            icon={<ImageIcon className="h-4 w-4 text-muted-foreground" />}
          />
          <ReferenceUpload
            label="Cor ref"
            value={refCor}
            onChange={setRefCor}
            icon={<Palette className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
