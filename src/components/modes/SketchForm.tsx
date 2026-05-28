"use client";
import { useState } from "react";
import { Pencil, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReferenceUpload } from "@/components/shared/ReferenceUpload";

export function SketchForm() {
  const [estiloRender, setEstiloRender] = useState<string>("");
  const [tecido, setTecido] = useState("");
  const [colorway, setColorway] = useState("");
  const [cenario, setCenario] = useState<string>("");
  const [refSketch, setRefSketch] = useState<File | null>(null);
  const [refMood, setRefMood] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const uploadCount = [refSketch, refMood].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">Sketch-to-Render</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Converta sketch, flat ou CAD em render fotorrealista.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label>
          Estilo do render <span className="text-destructive text-[10px]">*</span>
        </Label>
        <Select value={estiloRender} onValueChange={setEstiloRender}>
          <SelectTrigger className={touched && !estiloRender ? "border-destructive" : ""}>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fotorrealista">Fotorrealista (e-commerce)</SelectItem>
            <SelectItem value="editorial">Editorial / moodboard</SelectItem>
            <SelectItem value="still-life">Still life / flat lay</SelectItem>
            <SelectItem value="sketch-colorido">Sketch colorido</SelectItem>
          </SelectContent>
        </Select>
        {touched && !estiloRender && (
          <p className="text-[10px] text-destructive">Selecione o estilo do render</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sketch-tecido">Tecido / Material</Label>
        <Input
          id="sketch-tecido"
          placeholder="silk chiffon, cotton, leather"
          value={tecido}
          onChange={(e) => setTecido(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sketch-colorway">Colorway</Label>
        <Input
          id="sketch-colorway"
          placeholder="ivory / dusty rose, all-black"
          value={colorway}
          onChange={(e) => setColorway(e.target.value)}
        />
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
            <SelectItem value="no-corpo">No corpo / modelo</SelectItem>
            <SelectItem value="flat-lay">Flat lay</SelectItem>
            <SelectItem value="editorial">Editorial</SelectItem>
          </SelectContent>
        </Select>
        {touched && !cenario && (
          <p className="text-[10px] text-destructive">Selecione o cenário</p>
        )}
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
            label="Sketch"
            required
            value={refSketch}
            onChange={setRefSketch}
            icon={<Pencil className="h-4 w-4 text-muted-foreground" />}
          />
          <ReferenceUpload
            label="Mood"
            value={refMood}
            onChange={setRefMood}
            icon={<ImageIcon className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </div>
  );
}
