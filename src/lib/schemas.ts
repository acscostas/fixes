import { z } from "zod";

const fileRequired = (label: string) =>
  z
    .instanceof(File, { message: `${label} é obrigatório` })
    .refine((f) => f.size <= 10 * 1024 * 1024, "Máximo 10MB")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Formato inválido (JPG, PNG ou WEBP)"
    );

const fileOptional = () =>
  z
    .instanceof(File)
    .refine((f) => f.size <= 10 * 1024 * 1024, "Máximo 10MB")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Formato inválido"
    )
    .optional();

export const corSchema = z.object({
  colorway: z.string().min(1, "Informe o colorway desejado"),
  detalhes: z.string().optional(),
  notas: z.string().optional(),
  refProduto: fileRequired("Foto do produto"),
  refCor: fileOptional(),
});

export const estampaSchema = z.object({
  tipoAplicacao: z.enum(["all-over", "posicionada", "bordado"]),
  escala: z.enum(["media", "pequena", "grande", "macro"]),
  intensidade: z.enum(["sutil", "full"]).default("sutil"),
  preservarEstrutura: z.boolean().default(true),
  cores: z.enum(["originais", "adaptar"]).default("originais"),
  refProduto: fileRequired("Foto do produto"),
  refEstampa: fileRequired("Arquivo da estampa"),
});

export const modeloSchema = z.object({
  pose: z.enum(["frontal", "3/4", "costas", "perfil", "movimento"]),
  cenario: z.enum(["estudio-branco", "estudio-cinza", "urbano", "natureza"]),
  notasStyling: z.string().optional(),
  refPecas: fileRequired("Foto das peças"),
  refModelo: fileOptional(),
});

export const multiSchema = z.object({
  intencao: z.enum(["combinar", "recriar", "ponto-partida"]),
  formatoSaida: z.enum(["modelo", "flat-lay", "sketch-tecnico", "editorial"]),
  direcaoCriativa: z.string().optional(),
  ref1: fileRequired("Referência 1"),
  refPecas: fileOptional(),
});

export const sketchSchema = z.object({
  estiloRender: z.enum(["fotorrealista", "editorial", "still-life", "sketch-colorido"]),
  tecido: z.string().optional(),
  colorway: z.string().optional(),
  cenario: z.enum(["estudio-branco", "no-corpo", "flat-lay", "editorial"]),
  refSketch: fileRequired("Arquivo do sketch"),
  refMood: fileOptional(),
});

export const fotoSchema = z.object({
  estiloDesenho: z.enum(["flat-tecnico", "croqui", "cad-detalhado"]),
  vistas: z.enum(["frente-costas", "apenas-frente", "frente-costas-detalhes"]),
  traco: z.enum(["fino", "medio"]).default("fino"),
  mostrarCosturas: z.boolean().default(true),
  fundo: z.enum(["branco", "transparente"]).default("branco"),
  observacoes: z.string().optional(),
  refFoto: fileRequired("Foto do produto"),
});

export type CorFormValues = z.infer<typeof corSchema>;
export type EstampaFormValues = z.infer<typeof estampaSchema>;
export type ModeloFormValues = z.infer<typeof modeloSchema>;
export type MultiFormValues = z.infer<typeof multiSchema>;
export type SketchFormValues = z.infer<typeof sketchSchema>;
export type FotoFormValues = z.infer<typeof fotoSchema>;
