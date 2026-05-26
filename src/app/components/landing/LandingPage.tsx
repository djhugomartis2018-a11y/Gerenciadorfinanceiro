'use client';

import { useState } from 'react';
// Removido lucide-react para evitar erro de build caso a lib não esteja instalada

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const features = [
    { title: 'Dashboard Inteligente', description: 'Visualize toda sua situação financeira em um único lugar com gráficos interativos.' },
    { title: 'Análise Detalhada', description: 'Acompanhe a evolução de suas finanças com histórico visual.' },
    { title: 'Metas Financeiras', description: 'Defina objetivos de poupança e acompanhe seu progresso.' },
    { title: 'Gestão por Mês', description: 'Controle receitas e despesas de forma simples.' },
    { title: 'Segurança', description: 'Seus dados protegidos com autenticação segura.' },
    { title: 'Sincronização', description: 'Acesse seus dados de qualquer dispositivo.' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <h1 className="text-6xl font-black">Controle Seu Dinheiro</h1>
        <p className="text-text-dim mt-4">Organize seus gastos e tenha clareza financeira.</p>
        <button onClick={onGetStarted} className="mt-6 px-6 py-3 rounded-xl bg-accent-purple text-white font-bold hover:opacity-90 transition">
          Começar
        </button>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <div className="w-10 h-10 bg-accent-purple/20 rounded-lg mb-3" />
              <h4 className="font-bold mt-2">{f.title}</h4>
              <p className="text-sm text-text-dim">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black">Como Funciona</h2>
          <p className="text-text-dim">Três passos simples para começar sua jornada financeira</p>
        </div>

        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent -translate-y-1/2" />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {[
            { step: '01', title: 'Crie sua Conta', description: 'Registre-se com seu e-mail e crie uma senha segura em segundos.' },
            { step: '02', title: 'Configure seus Dados', description: 'Adicione suas receitas e despesas.' },
            { step: '03', title: 'Acompanhe e Evolua', description: 'Monitore seu progresso e tome melhores decisões.' }
          ].map((item, i) => (
            <div key={i} className="group text-center space-y-4 relative z-10 p-6 rounded-2xl border border-border bg-background transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(124,58,237,0.25)]">
              <div className="hidden md:flex absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-purple shadow-[0_0_20px_rgba(124,58,237,0.8)]" />
              <div className="text-5xl font-black text-accent-purple/30 group-hover:text-accent-purple/60 transition-colors">{item.step}</div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-text-dim">{item.description}</p>
              <div className="h-1 w-0 bg-accent-purple mx-auto group-hover:w-16 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 border-t border-border">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl font-black">Planos e preços</h2>
          <p className="text-text-dim">Escolha o plano ideal para você</p>
          <p className="text-sm text-accent-purple font-semibold">7 dias grátis • Sem cartão</p>
        </div>

        {/* TOGGLE */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-surface rounded-full p-1 border border-border">
            <button onClick={() => setIsAnnual(false)} className={`px-4 py-2 rounded-full text-sm font-semibold ${!isAnnual ? 'bg-background text-white' : 'text-text-dim'}`}>
              Mensal
            </button>
            <button onClick={() => setIsAnnual(true)} className={`px-4 py-2 rounded-full text-sm font-semibold ${isAnnual ? 'bg-background text-white' : 'text-text-dim'}`}>
              Anual <span className="ml-2 text-green-400 text-xs">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* FREE */}
          <div className="border rounded-2xl p-6">
            <h3 className="font-bold">Básico</h3>
            <p className="text-3xl font-black mt-2">Grátis</p>
            <ul className="mt-4 text-sm text-text-dim space-y-2">
              <li>Até 2 contas</li>
              <li>50 lançamentos/mês</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-accent-purple text-white rounded-lg" onClick={onGetStarted}>Começar</button>
          </div>

          {/* ESSENCIAL */}
          <div className="border-2 border-accent-purple rounded-2xl p-6">
            <h3 className="font-bold">Essencial</h3>
            <p className="text-3xl font-black mt-2">{isAnnual ? 'R$ 15/mês' : 'R$ 19/mês'}</p>
            {isAnnual && <p className="text-green-400 text-xs">Economize R$ 48/ano</p>}
            <ul className="mt-4 text-sm text-text-dim space-y-2">
              <li>Ilimitado</li>
              <li>Relatórios</li>
            </ul>
            <button className="mt-6 w-full py-2 bg-accent-purple text-white rounded-lg" onClick={onGetStarted}>Assinar</button>
          </div>

          {/* PRO */}
          <div className="border rounded-2xl p-6">
            <h3 className="font-bold">Pro</h3>
            <p className="text-3xl font-black mt-2">{isAnnual ? 'R$ 31/mês' : 'R$ 39/mês'}</p>
            <ul className="mt-4 text-sm text-text-dim space-y-2">
              <li>Planejamento</li>
              <li>Dashboard</li>
            </ul>
            <button className="mt-6 w-full py-2 border border-border rounded-lg" onClick={onGetStarted}>Assinar</button>
          </div>

        </div>
      </section>

    </div>
  );
}
