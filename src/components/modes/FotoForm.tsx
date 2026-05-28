"use client";
import { useState } from "react";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup } from "@/components/shared/ToggleGroup";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";

export function FotoForm() {
  const [estiloDesenho, setEstiloDesenho] = useState<string>("");
  const [vistas, setVistas] = useState<string>("");
  const [traco, setTraco] = useState("fino");
  const [mostrarCosturas, setMostrarCosturas] = useState(true);
  const [fundo, setFundo] = useState("branco");
  const [observacoes, setObservacoes] = useState("");
  const [refFoto, setRefFoto] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Foto → Desenho Técnico</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Gere um flat/CAD a partir de uma foto de produto.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label>
          Estilo do desenho <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={estiloDesenho} onValueChange={setEstiloDesenho}>
          <SelectTrigger className={touched && !estiloDesenho ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flat-tecnico">Flat técnico (linha limpa)</SelectItem>
            <SelectItem value="croqui">Croqui de estilo</SelectItem>
            <SelectItem value="cad-detalhado">CAD detalhado</SelectItem>
          </SelectContent>
        </Select>
        {touched && !estiloDesenho && (
          <p className="text-[10px] text-destructive">Selecione o estilo do desenho</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Vistas <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={vistas} onValueChange={setVistas}>
          <SelectTrigger className={touched && !vistas ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frente-costas">Frente e costas</SelectItem>
            <SelectItem value="apenas-frente">Apenas frente</SelectItem>
            <SelectItem value="frente-costas-detalhes">Frente, costas e detalhes</SelectItem>
          </SelectContent>
        </Select>
        {touched && !vistas && (
          <p className="text-[10px] text-destructive">Selecione as vistas</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Traço</Label>
        <ToggleGroup
          options={[{ label: "Fino", value: "fino" }, { label: "Médio", value: "medio" }]}
          value={traco}
          onChange={setTraco}
        />
      </div>

      <div className="flex items-start gap-2 py-0.5">
        <Checkbox
          id="costuras"
          checked={mostrarCosturas}
          onCheckedChange={(v) => setMostrarCosturas(!!v)}
        />
        <div>
          <label htmlFor="costuras" className="text-xs font-medium cursor-pointer">
            Mostrar costuras e pespontos
          </label>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Linhas construtivas detalhadas
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Fundo</Label>
        <ToggleGroup
          options={[{ label: "Branco", value: "branco" }, { label: "Transparente", value: "transparente" }]}
          value={fundo}
          onChange={setFundo}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="foto-obs">Observações</Label>
        <Input
          id="foto-obs"
          placeholder="zíper frontal, cós elástico"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Referências
          </span>
          <span className="text-[10px] text-muted-foreground">{refFoto ? 1 : 0}/1</span>
        </div>
        <div className="flex gap-3">
          <ReferenceUpload
            label="Foto"
            required
            value={refFoto}
            onChange={setRefFoto}
            icon={<Camera className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
