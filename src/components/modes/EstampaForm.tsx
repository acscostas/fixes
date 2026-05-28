"use client";
import { useState } from "react";
import { Image as ImageIcon, Brush } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup } from "@/components/shared/ToggleGroup";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";

export function EstampaForm() {
  const [tipo, setTipo] = useState<string>("");
  const [escala, setEscala] = useState<string>("");
  const [intensidade, setIntensidade] = useState("sutil");
  const [preservar, setPreservar] = useState(true);
  const [cores, setCores] = useState("originais");
  const [refProduto, setRefProduto] = useState<File | null>(null);
  const [refEstampa, setRefEstampa] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const uploadCount = [refProduto, refEstampa].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Aplicar Estampa</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Aplique uma estampa na superfície da peça.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label>
          Tipo de aplicação <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={tipo} onValueChange={setTipo}>
          <SelectTrigger className={touched && !tipo ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-over">All-over (toda a superfície)</SelectItem>
            <SelectItem value="posicionada">Posicionada</SelectItem>
            <SelectItem value="bordado">Bordado</SelectItem>
          </SelectContent>
        </Select>
        {touched && !tipo && (
          <p className="text-[10px] text-destructive">Selecione o tipo de aplicação</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Escala <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={escala} onValueChange={setEscala}>
          <SelectTrigger className={touched && !escala ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="media">Média</SelectItem>
            <SelectItem value="pequena">Pequena</SelectItem>
            <SelectItem value="grande">Grande</SelectItem>
            <SelectItem value="macro">Macro</SelectItem>
          </SelectContent>
        </Select>
        {touched && !escala && (
          <p className="text-[10px] text-destructive">Selecione a escala</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Intensidade</Label>
        <ToggleGroup
          options={[{ label: "Sutil", value: "sutil" }, { label: "Full", value: "full" }]}
          value={intensidade}
          onChange={setIntensidade}
        />
      </div>

      <div className="flex items-start gap-2 py-0.5">
        <Checkbox
          id="preservar"
          checked={preservar}
          onCheckedChange={(v) => setPreservar(!!v)}
        />
        <div>
          <label htmlFor="preservar" className="text-xs font-medium cursor-pointer">
            Preservar estrutura da peça
          </label>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Manter costuras e volumetria
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Cores</Label>
        <ToggleGroup
          options={[{ label: "Originais", value: "originais" }, { label: "Adaptar à peça", value: "adaptar" }]}
          value={cores}
          onChange={setCores}
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
            label="Estampa"
            required
            value={refEstampa}
            onChange={setRefEstampa}
            icon={<Brush className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
