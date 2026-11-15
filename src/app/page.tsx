import Link from "next/link";
import { Bloom, Grain } from "@/components/landing/Bloom";
import { VitrinePhoto } from "@/components/landing/VitrinePhoto";

const MODES = [
  { title: "Variantes de cor", text: "Novas cartelas para a mesma peça, em segundos." },
  { title: "Aplicar estampa", text: "Teste estampas do acervo direto na modelagem." },
  { title: "Produto em modelo", text: "Do still ao look vestido, sem produção de foto." },
  { title: "Múltiplas referências", text: "Combine moodboards em uma única direção criativa." },
  { title: "Sketch-to-render", text: "Do croqui à imagem fotorrealista." },
  { title: "Foto para técnico", text: "Da foto ao desenho técnico, pronto para a ficha." },
];

function Signature({ className = "" }: { className?: string }) {
  return (
    <p className={`font-sans text-xs font-bold uppercase tracking-wide text-cream sm:text-sm ${className}`}>
      Somalabs - Azzas 2154
    </p>
  );
}

export default function Home() {
  return (
    <main className="bg-[#2A161C] text-cream">
      {/* Capa */}
      <section className="relative flex min-h-svh flex-col overflow-hidden px-5 py-6 sm:px-12 sm:py-10">
        <Bloom />
        <Grain />
        <header className="relative z-10 flex items-center justify-between">
          <span className="font-sans text-xs font-bold tracking-wide sm:text-sm">2026</span>
          <Link
            href="/studio"
            className="font-sans text-xs font-bold uppercase tracking-wide underline-offset-4 hover:underline sm:text-sm"
          >
            Entrar no studio →
          </Link>
        </header>
        <h1 className="relative z-10 mt-[8vh] font-display text-[clamp(4.5rem,17vw,15rem)] uppercase leading-[0.86] text-burgundy">
          Studio
          <br />
          IAzzas
        </h1>
        <Signature className="relative z-10 mt-auto self-end" />
      </section>

      {/* Manifesto */}
      <section className="relative flex min-h-svh flex-col overflow-hidden px-5 py-6 sm:px-12 sm:py-10">
        <Bloom rotate={24} cx={48} cy={62} scale={1.1} />
        <Grain />
        <span className="relative z-10 self-end font-sans text-xs font-bold sm:text-sm">2026</span>
        <h2 className="relative z-10 mt-4 max-w-[14ch] font-display text-[clamp(3rem,9.5vw,8.5rem)] uppercase leading-[0.92]">
          Uma comunidade de inovação colaborativa
        </h2>
        <p className="relative z-10 mt-8 max-w-xl font-sans text-sm font-bold uppercase leading-snug sm:text-base">
          Vamos inovar juntos para construir um futuro colaborativo, compartilhando o que já funciona.
        </p>
        <Signature className="relative z-10 mt-auto self-end pt-10" />
      </section>

      {/* AI Vitrine */}
      <section className="relative flex min-h-svh overflow-hidden bg-[#E7E1EA] px-5 py-6 sm:px-12 sm:py-10">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -left-[12%] top-[-10%] h-[70%] w-[45%] rounded-[38%] bg-gradient-to-br from-[#F4EEE6] via-[#C9C3BC] to-[#8F9A97] blur-2xl" />
          <div className="absolute -left-[8%] bottom-[-15%] h-[60%] w-[42%] rounded-[38%] bg-gradient-to-tr from-[#D7B98E] via-[#E9E1D6] to-[#B7BDB8] blur-2xl" />
          <div className="absolute -right-[12%] top-[-12%] h-[60%] w-[45%] rounded-[38%] bg-gradient-to-bl from-[#F2ECE4] via-[#CFC7BE] to-[#D6B27E] blur-2xl" />
          <div className="absolute -right-[10%] bottom-[-10%] h-[65%] w-[44%] rounded-[38%] bg-gradient-to-tl from-[#C8A574] via-[#EAE3D8] to-[#A9B2AE] blur-2xl" />
        </div>
        <div className="absolute inset-x-[18%] bottom-0 top-[6%] sm:inset-x-[30%]">
          <VitrinePhoto />
        </div>
        <Grain className="opacity-20" />
        <span className="absolute right-5 top-6 z-10 font-sans text-xs font-bold sm:right-12 sm:top-10 sm:text-sm">
          2026
        </span>
        <h2 className="relative z-10 mt-auto pb-8 font-display text-[clamp(4.5rem,15vw,13rem)] sm:pb-0 uppercase leading-[0.86] [text-shadow:0_2px_30px_rgba(0,0,0,0.12)]">
          AI
          <br />
          Vitrine
        </h2>
        <Signature className="absolute bottom-6 right-5 z-10 sm:bottom-10 sm:right-12" />
      </section>

      {/* Modos */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-12 sm:py-24">
        <Bloom rotate={-30} cx={78} cy={40} scale={1.3} className="opacity-90" />
        <Grain />
        <div className="relative z-10">
          <p className="font-sans text-xs font-bold uppercase tracking-wide sm:text-sm">O que o studio faz</p>
          <ol className="mt-8 divide-y divide-cream/30 border-y border-cream/30">
            {MODES.map((m, i) => (
              <li key={m.title} className="grid gap-2 py-5 sm:grid-cols-[6rem_1fr_minmax(0,22rem)] sm:items-end sm:gap-8">
                <span className="font-display text-2xl text-burgundy sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(2.25rem,6vw,5rem)] uppercase leading-[0.9]">{m.title}</h3>
                <p className="font-sans text-sm font-bold uppercase leading-snug sm:text-right">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative flex min-h-[80svh] flex-col overflow-hidden px-5 py-6 sm:px-12 sm:py-10">
        <Bloom rotate={50} cx={30} cy={70} />
        <Grain />
        <div className="relative z-10 my-auto">
          <h2 className="font-display text-[clamp(3.5rem,12vw,11rem)] uppercase leading-[0.98] text-burgundy">
            Crie a próxima
            <br />
            coleção
          </h2>
          <Link
            href="/studio"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-burgundy px-7 py-4 font-sans text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-[#6E0F2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            Entrar no studio →
          </Link>
        </div>
        <Signature className="relative z-10 self-end" />
      </section>
    </main>
  );
}
