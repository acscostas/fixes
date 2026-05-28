"use client";
import { useState } from "react";
import { Image as ImageIcon, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";
import { FormAlert } from "@/components/shared/FormAlert";

export function ModeloForm() {
  const [pose, setPose] = useState<string>("");
  const [cenario, setCenario] = useState<string>("");
  const [notas, setNotas] = useState("");
  const [refPecas, setRefPecas] = useState<File | null>(null);
  const [refModelo, setRefModelo] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const uploadCount = [refPecas, refModelo].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Produto em Modelo</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Exiba a peça sendo usada por uma modelo.
        </p>
      </div>

      <FormAlert>
        Requer revisão humana antes do uso comercial.
      </FormAlert>

      <div className="space-y-1.5">
        <Label>
          Pose <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={pose} onValueChange={setPose}>
          <SelectTrigger className={touched && !pose ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontal">Frontal</SelectItem>
            <SelectItem value="3/4">3/4</SelectItem>
            <SelectItem value="costas">Costas</SelectItem>
            <SelectItem value="perfil">Perfil</SelectItem>
            <SelectItem value="movimento">Movimento</SelectItem>
          </SelectContent>
        </Select>
        {touched && !pose && (
          <p className="text-[10px] text-destructive">Selecione a pose</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>
          Cenário <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={cenario} onValueChange={setCenario}>
          <SelectTrigger className={touched && !cenario ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="estudio-branco">Estúdio fundo branco</SelectItem>
            <SelectItem value="estudio-cinza">Estúdio fundo cinza</SelectItem>
            <SelectItem value="urbano">Ambiente urbano</SelectItem>
            <SelectItem value="natureza">Natureza</SelectItem>
          </SelectContent>
        </Select>
        {touched && !cenario && (
          <p className="text-[10px] text-destructive">Selecione o cenário</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="modelo-notas">Notas de styling</Label>
        <Input
          id="modelo-notas"
          placeholder="cinto, sapatos neutros, cabelo solto"
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
            label="Peças"
            required
            value={refPecas}
            onChange={setRefPecas}
            icon={<ImageIcon className="h-4 w-4 text-muted-foreground" />}
          />
          <ReferenceUpload
            label="Modelo"
            value={refModelo}
            onChange={setRefModelo}
            icon={<User className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
