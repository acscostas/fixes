"use client";
import { useState } from "react";
import { Image as ImageIcon, Shirt, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";
import { FormAlert } from "@/components/shared/FormAlert";

export function MultiForm() {
  const [intencao, setIntencao] = useState<string>("");
  const [formato, setFormato] = useState<string>("");
  const [direcao, setDirecao] = useState("");
  const [ref1, setRef1] = useState<File | null>(null);
  const [refPecas, setRefPecas] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const uploadCount = [ref1, refPecas].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Múltiplas Referências</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Composições a partir de múltiplas referências.
        </p>
      </div>

      <FormAlert>
        Requer revisão humana antes do uso comercial.
      </FormAlert>

      <div className="space-y-1.5">
        <Label>
          Intenção <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={intencao} onValueChange={setIntencao}>
          <SelectTrigger className={touched && !intencao ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="combinar">Combinar elementos</SelectItem>
            <SelectItem value="recriar">Recriar no estilo</SelectItem>
            <SelectItem value="ponto-partida">Usar como ponto de partida</SelectItem>
          </SelectContent>
        </Select>
        {touched && !intencao && (
          <p className="text-[10px] text-destructive">Selecione a intenção</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Formato de saída <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={formato} onValueChange={setFormato}>
          <SelectTrigger className={touched && !formato ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modelo">Em modelo</SelectItem>
            <SelectItem value="flat-lay">Flat lay</SelectItem>
            <SelectItem value="sketch-tecnico">Sketch técnico</SelectItem>
            <SelectItem value="editorial">Editorial</SelectItem>
          </SelectContent>
        </Select>
        {touched && !formato && (
          <p className="text-[10px] text-destructive">Selecione o formato de saída</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="multi-direcao">Direção criativa</Label>
        <Textarea
          id="multi-direcao"
          placeholder="bordados maximalistas, paleta terrosa..."
          value={direcao}
          onChange={(e) => setDirecao(e.target.value)}
          rows={2}
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
            label="Ref 1"
            required
            value={ref1}
            onChange={setRef1}
            icon={<ImageIcon className="h-4 w-4 text-muted-foreground" />}
          />
          <ReferenceUpload
            label="Peças"
            value={refPecas}
            onChange={setRefPecas}
            icon={<Shirt className="h-4 w-4 text-muted-foreground" />}
          />
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="w-16 h-[72px] rounded-md border-[1.5px] border-dashed border-border hover:border-muted-foreground transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-[10px] text-muted-foreground">Adicionar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
