@AGENTS.md

# IAzzas Studio — Contexto do Projeto

## O produto

**IAzzas Studio** é uma ferramenta interna de geração de imagens de moda com IA para a **Azzas 2154 / Soma Group**.

Designers e equipe de produto descrevem peças via prompt e configuram parâmetros (variante de cor, estampa, produto em modelo, sketch) para gerar visualizações de moda.

- **Repo**: `acscostas/fixes`
- **Branch de desenvolvimento**: `claude/confident-archimedes-8mcZD`
- **Deploy**: Vercel (conectado ao repositório acima)

---

## Estado atual — o que está construído

- Layout editorial claro: fundo off-white `#F8F7F5`, tipografia carvão, acento violet apenas em CTAs
- **Tab Studio**: CommandBar flutuante (prompt + chips de modo + botão Gerar), ModeDrawer slide-in lateral com 6 formulários de modo, galeria de imagens geradas
- **Tab Analisar**: upload de imagem → extração de cor, palavras-chave, atributos, descrição editável
- **Tab Histórico**: placeholder — ainda não implementado
- Geração **simulada** (sem API real): ao clicar Gerar, o progresso anima e retornam fotos do Unsplash como mock
- `<img>` com `onError` → fallback para gradientes editoriais quando CDN está inacessível

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19 + TypeScript** |
| Estilos | **Tailwind CSS v3** + tokens CSS em `globals.css` |
| Componentes | **shadcn/ui + Radix UI** (`src/components/ui/`) |
| Estado | **Zustand** (`src/store/studioStore.ts`) |
| Validação | react-hook-form + zod (disponíveis, ainda não usados nos forms de modo) |
| Upload | react-dropzone |
| Toasts | Sonner (theme light) |
| Fonte | Inter via `next/font/google` |

> **Atenção Next.js**: Esta versão tem breaking changes. Antes de usar APIs novas, consultar `node_modules/next/dist/docs/`.

---

## Arquitetura de componentes

```
src/
  app/
    globals.css            <- tokens CSS (:root vars: --accent-primary, --surface, --border...)
    layout.tsx             <- Inter font, Toaster
    studio/page.tsx        <- shell da app: tabs, drawerOpen state
  components/
    layout/
      TopNav.tsx            <- header com logo e tabs de navegação
      CommandBar.tsx        <- barra flutuante de geração (chips + prompt + Gerar)
      ModeDrawer.tsx        <- painel lateral slide-in com formulário do modo ativo
    studio/
      StudioScreen.tsx      <- galeria ou EmptyState
      GeneratedGallery.tsx  <- grid de ImageCards
      ImageCard.tsx         <- card: <img> real com fallback para gradiente editorial
      ZoomModal.tsx         <- modal de ampliação com ações
      EmptyState.tsx        <- estado zero com hero editorial e sugestões de prompt
    modes/
      CorForm.tsx           <- "Variantes de Cor"
      EstampaForm.tsx       <- "Aplicar Estampa"
      ModeloForm.tsx        <- "Produto em Modelo"
      MultiForm.tsx         <- "Múltiplas Refs."
      SketchForm.tsx        <- "Sketch-to-Render"
      FotoForm.tsx          <- "Foto -> Técnico"
    analisar/
      AnalysisScreen.tsx    <- tela de análise de imagem (demo estático)
    shared/
      ReferenceUpload.tsx   <- dropzone de imagem de referência
      ToggleGroup.tsx       <- grupo de botões de seleção exclusiva
      AdvancedSettings.tsx  <- seed, guidance, steps, neg prompt (collapsible)
      FormAlert.tsx         <- alerta de aviso nos formulários
    ui/                     <- componentes shadcn — não editar diretamente
  store/
    studioStore.ts          <- Zustand: modo ativo, quantidade, geração, imagens, advanced
  types/
    index.ts                <- Mode, GeneratedImage, AspectRatio, Quantity, AdvancedSettings
```

---

## Padrões de código

- **Tokens de cor**: `hsl(var(--border))`, `hsl(var(--muted-foreground))`, etc. Nunca colocar alpha dentro da variável CSS — use classes Tailwind como `border-[hsl(var(--border))]`.
- **Botão CTA principal**: `<Button variant="generate">` (violet, sem glow)
- **Imagens externas**: usar `<img>` simples com `onError` para fallback. O domínio `images.unsplash.com` está configurado em `next.config.ts`.
- **Idioma**: PT-BR em toda a interface
- **Sem comentários óbvios**: só comentar o "porquê" quando não é evidente pelo código

---

## Roadmap — o que ainda falta

### Alta prioridade
- [ ] **API real de geração**: integrar Stability AI, Fal.ai ou similar — substituir o mock em `finishGeneration` em `studioStore.ts`
- [ ] **Payload dos formulários**: cada Form deve expor seus campos para montar o body da requisição da API
- [ ] **Histórico de gerações** (Tab Histórico): persistência via localStorage ou banco

### Média prioridade
- [ ] **Análise real de imagem**: substituir demo estático em `AnalysisScreen` por chamada a Claude Vision ou GPT-4o
- [ ] **Export de ficha técnica**: gerar PDF ou JSON a partir dos dados da análise
- [ ] **Download real das imagens** geradas (hoje é toast fake)

### Baixa prioridade / futuro
- [ ] Autenticação de usuário
- [ ] Salvar/organizar gerações em coleções
- [ ] Integração com acervo próprio de imagens da Azzas (substituir Unsplash por URLs reais)
