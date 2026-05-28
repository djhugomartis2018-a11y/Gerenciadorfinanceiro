import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const plans = [
    {
      name: "Básico",
      price: "R$ 0",
      annualPrice: "R$ 0",
      description: "Perfeito para começar",
      features: [
        "Até 2 contas",
        "50 lançamentos/mês",
        "Visão mensal",
        "Suporte por email",
      ],
      cta: "Começar",
      highlighted: false,
    },
    {
      name: "Essencial",
      price: "R$ 19",
      annualPrice: "R$ 15",
      description: "Mais controle, mais liberdade",
      features: [
        "Lançamentos ilimitados",
        "Categorias personalizadas",
        "Relatórios simples",
        "Exportação de dados",
        "Suporte prioritário",
      ],
      cta: "Assinar",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "R$ 39",
      annualPrice: "R$ 31",
      description: "Controle financeiro total",
      features: [
        "Metas financeiras avançadas",
        "Planejamento mensal",
        "Comparação de períodos",
        "Dashboard avançado",
        "Análise preditiva",
        "Suporte 24/7",
      ],
      cta: "Assinar",
      highlighted: false,
    },
  ];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      canvas.height = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let ps: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      ps = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) ps.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        ctx.fillStyle = `rgba(240,240,242,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => { setSize(); init(); });
    ro.observe(canvas.parentElement || document.body);
    init();
    raf = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      style={{
        ["--bg" as any]: "#0b0b0c",
        ["--text" as any]: "#f6f7f8",
        ["--muted" as any]: "#a6a7ac",
        ["--border" as any]: "#2a2a2e",
        ["--card" as any]: "#111214",
        ["--card-pop" as any]: "#15161a",
        ["--accent-line" as any]: "#27272a",
        ["--glow" as any]: "rgba(255,255,255,0.08)",
        ["--btn-primary-bg" as any]: "#640cd6",
        ["--btn-primary-fg" as any]: "#ffffff",
        ["--btn-ghost-border" as any]: "#2a2a2e",
        ["--btn-ghost-hover" as any]: "rgba(255,255,255,0.04)",
      } as React.CSSProperties}
      className={`relative w-full overflow-hidden ${ready ? "is-ready" : ""}`}
    >
      <style>{`
        .pricing-wrap{position:relative}
        .pricing-wrap .accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.7}
        .pricing-wrap .accent-lines .hline,.pricing-wrap .accent-lines .vline{position:absolute;background:var(--accent-line);animation-fill-mode:forwards}
        .pricing-wrap .accent-lines .hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%}
        .pricing-wrap .accent-lines .vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%}
        .pricing-wrap.is-ready .accent-lines .hline:nth-of-type(1){top:25%;animation:drawX .6s ease .08s forwards}
        .pricing-wrap.is-ready .accent-lines .hline:nth-of-type(2){top:75%;animation:drawX .6s ease .16s forwards}
        .pricing-wrap.is-ready .accent-lines .vline:nth-of-type(1){left:33%;animation:drawY .7s ease .20s forwards}
        .pricing-wrap.is-ready .accent-lines .vline:nth-of-type(2){left:66%;animation:drawY .7s ease .28s forwards}
        @keyframes drawX{to{transform:scaleX(1)}}
        @keyframes drawY{to{transform:scaleY(1)}}
        .pricing-wrap .p-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:28px;transition:border-color .2s,transform .2s}
        .pricing-wrap .p-card:hover{border-color:rgba(100,12,214,0.35);transform:translateY(-3px)}
        .pricing-wrap .p-card-pop{background:var(--card-pop);border:1px solid rgba(100,12,214,0.55);border-radius:20px;padding:28px;transform:scale(1.03);box-shadow:0 0 40px rgba(100,12,214,0.15),0 10px 30px rgba(0,0,0,.35);backdrop-filter:blur(6px)}
        .pricing-wrap .card-animate{opacity:0;transform:translateY(14px)}
        .pricing-wrap.is-ready .card-animate{animation:pFadeUp .6s ease forwards}
        @keyframes pFadeUp{to{opacity:1;transform:translateY(0)}}
        .pricing-wrap .p-btn-primary{width:100%;border-radius:12px;padding:12px 16px;font-weight:700;font-size:14px;background:var(--btn-primary-bg);color:var(--btn-primary-fg);border:none;cursor:pointer;transition:filter .15s,transform .15s}
        .pricing-wrap .p-btn-primary:hover{filter:brightness(1.15)}
        .pricing-wrap .p-btn-primary:active{transform:translateY(1px)}
        .pricing-wrap .p-btn-ghost{width:100%;border-radius:12px;padding:12px 16px;font-weight:700;font-size:14px;color:var(--text);border:1px solid var(--btn-ghost-border);background:transparent;cursor:pointer;transition:background .2s,transform .15s,border-color .2s}
        .pricing-wrap .p-btn-ghost:hover{background:var(--btn-ghost-hover);border-color:rgba(100,12,214,0.4)}
        .pricing-wrap .p-btn-ghost:active{transform:translateY(1px)}
        .pricing-wrap .chip{position:relative;border:1px solid rgba(100,12,214,0.5);background:rgba(100,12,214,0.2);color:#e6e7ea;border-radius:9999px;padding:5px 16px;font-size:12px;font-weight:700;letter-spacing:0.04em}
        .pricing-wrap .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(80% 60% at 50% 12%, rgba(100,12,214,.06), transparent 60%)}
        .pricing-wrap .toggle-wrap{display:inline-flex;align-items:center;border-radius:9999px;padding:4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08)}
        .pricing-wrap .toggle-btn{padding:9px 22px;border-radius:9999px;font-size:13px;font-weight:600;border:none;cursor:pointer;transition:background .2s,color .2s}
        .pricing-wrap .toggle-btn.on{background:rgba(100,12,214,0.85);color:#fff}
        .pricing-wrap .toggle-btn.off{background:transparent;color:#666}
      `}</style>

      <div className="vignette" />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }} />

      <div aria-hidden className="accent-lines">
        <div className="hline" /><div className="hline" />
        <div className="vline" /><div className="vline" />
      </div>

      <div style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(30px,5vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>
            Preços Simples e Transparentes
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 28 }}>
            Escolha o plano ideal para o seu crescimento financeiro.
          </p>

          {/* Toggle */}
          <div className="toggle-wrap">
            <button className={`toggle-btn ${!isAnnual ? 'on' : 'off'}`} onClick={() => setIsAnnual(false)}>Mensal</button>
            <button className={`toggle-btn ${isAnnual ? 'on' : 'off'}`} onClick={() => setIsAnnual(true)}>
              Anual
              {!isAnnual && <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(218,235,68,0.15)', color: '#daeb44', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>-20%</span>}
              {isAnnual && <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(218,235,68,0.15)', color: '#daeb44', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>-20%</span>}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto', alignItems: 'center' }}>
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`card-animate ${plan.highlighted ? 'p-card-pop' : 'p-card'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s`, position: 'relative' }}
            >
              {plan.highlighted && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="chip">⭐ Mais Popular</div>
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>{plan.description}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 38, fontWeight: 800, color: plan.highlighted ? '#daeb44' : '#fff', lineHeight: 1 }}>
                    {isAnnual ? plan.annualPrice : plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>/mês</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {isAnnual ? 'Cobrado anualmente' : 'Cobrado mensalmente'}
                </p>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 20 }} />

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#d4d5d9' }}>
                    <Check size={15} style={{ color: plan.highlighted ? '#daeb44' : '#555', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={plan.highlighted ? 'p-btn-primary' : 'p-btn-ghost'}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
