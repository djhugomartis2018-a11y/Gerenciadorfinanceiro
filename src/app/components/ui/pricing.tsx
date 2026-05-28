import { useEffect, useRef, useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";

interface PricingFeature { text: string }
interface PricingPlan {
  id: string; name: string; description: string;
  monthlyPrice: string; yearlyPrice: string;
  features: PricingFeature[];
  button: { text: string; url: string };
  popular?: boolean;
}
interface PricingProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

export function PricingSection({
  heading = "Preços Simples e Transparentes",
  description = "Escolha o plano ideal para o seu crescimento financeiro.",
  plans = [
    {
      id: "basic",
      name: "Básico",
      description: "Perfeito para começar",
      monthlyPrice: "Grátis",
      yearlyPrice: "Grátis",
      features: [
        { text: "Até 2 contas" },
        { text: "50 lançamentos/mês" },
        { text: "Visão mensal" },
        { text: "Suporte por email" },
      ],
      button: { text: "Começar Grátis", url: "#" },
    },
    {
      id: "essential",
      name: "Essencial",
      description: "Mais controle, mais liberdade",
      monthlyPrice: "R$ 19",
      yearlyPrice: "R$ 15",
      features: [
        { text: "Lançamentos ilimitados" },
        { text: "Categorias personalizadas" },
        { text: "Relatórios simples" },
        { text: "Exportação de dados" },
        { text: "Suporte prioritário" },
      ],
      button: { text: "Assinar", url: "#" },
      popular: true,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Controle financeiro total",
      monthlyPrice: "R$ 39",
      yearlyPrice: "R$ 31",
      features: [
        { text: "Metas financeiras avançadas" },
        { text: "Planejamento mensal" },
        { text: "Comparação de períodos" },
        { text: "Dashboard avançado" },
        { text: "Análise preditiva" },
        { text: "Suporte 24/7" },
      ],
      button: { text: "Começar Agora", url: "#" },
    },
  ],
}: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
      y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < count; i++) parts.push(make());
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        ctx.fillStyle = `rgba(218,235,68,${p.o * 0.4})`;
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
    <div className="relative w-full overflow-hidden">
      <style>{`
        .navex-pricing-canvas{position:absolute;inset:0;width:100%;height:100%;opacity:0.35;pointer-events:none}
        .navex-hline,.navex-vline{position:absolute;background:rgba(255,255,255,0.04)}
        .navex-hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:navexDrawX .6s ease forwards}
        .navex-vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:navexDrawY .7s ease forwards}
        .navex-hline:nth-child(1){top:33%;animation-delay:.1s}
        .navex-hline:nth-child(2){top:66%;animation-delay:.2s}
        .navex-vline:nth-child(3){left:33%;animation-delay:.15s}
        .navex-vline:nth-child(4){left:66%;animation-delay:.25s}
        @keyframes navexDrawX{to{transform:scaleX(1)}}
        @keyframes navexDrawY{to{transform:scaleY(1)}}
        .navex-card-in{opacity:0;transform:translateY(14px);animation:navexFadeUp .55s ease forwards}
        @keyframes navexFadeUp{to{opacity:1;transform:translateY(0)}}
        .navex-toggle-pill{display:inline-flex;align-items:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:9999px;padding:4px}
        .navex-toggle-btn{padding:8px 22px;border-radius:9999px;font-size:13px;font-weight:600;border:none;cursor:pointer;transition:background .2s,color .2s}
        .navex-toggle-btn.active{background:rgba(100,12,214,0.35);color:#daeb44}
        .navex-toggle-btn.inactive{background:transparent;color:rgba(255,255,255,0.45)}
        .navex-card{background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:28px;display:flex;flex-direction:column;position:relative;transition:border-color .2s,transform .2s}
        .navex-card:hover{border-color:rgba(100,12,214,0.4);transform:translateY(-2px)}
        .navex-card.popular{background:#1a1a1a;border-color:rgba(100,12,214,0.5);box-shadow:0 0 40px rgba(100,12,214,0.12)}
        .navex-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#640cd6,#8b2cf6);color:#fff;font-size:11px;font-weight:700;padding:4px 16px;border-radius:9999px;white-space:nowrap;letter-spacing:0.05em}
        .navex-btn-primary{width:100%;padding:13px;border-radius:12px;font-size:14px;font-weight:700;border:none;cursor:pointer;background:linear-gradient(135deg,#640cd6,#8b2cf6);color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;transition:filter .15s,transform .15s}
        .navex-btn-primary:hover{filter:brightness(1.12)}
        .navex-btn-primary:active{transform:translateY(1px)}
        .navex-btn-outline{width:100%;padding:12px;border-radius:12px;font-size:14px;font-weight:600;border:1px solid rgba(255,255,255,0.1);cursor:pointer;background:transparent;color:rgba(255,255,255,0.75);display:flex;align-items:center;justify-content:center;gap:8px;transition:background .15s,border-color .15s}
        .navex-btn-outline:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.2)}
        .navex-sep{height:1px;background:rgba(255,255,255,0.06);margin:20px 0}
        .navex-price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        @media(max-width:900px){.navex-price-grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}}
      `}</style>

      {/* Particles canvas */}
      <canvas ref={canvasRef} className="navex-pricing-canvas" />

      {/* Grid lines */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="navex-hline" />
        <div className="navex-hline" />
        <div className="navex-vline" />
        <div className="navex-vline" />
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#640cd6', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>Planos</p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 14 }}>{heading}</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 28px' }}>{description}</p>

        {/* Toggle */}
        <div className="navex-toggle-pill">
          <button className={`navex-toggle-btn ${!isYearly ? 'active' : 'inactive'}`} onClick={() => setIsYearly(false)}>Mensal</button>
          <button className={`navex-toggle-btn ${isYearly ? 'active' : 'inactive'}`} onClick={() => setIsYearly(true)}>
            Anual
            <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(218,235,68,0.15)', color: '#daeb44', padding: '1px 7px', borderRadius: 20, fontWeight: 700 }}>-20%</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="navex-price-grid" style={{ position: 'relative' }}>
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`navex-card navex-card-in ${plan.popular ? 'popular' : ''}`}
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            {plan.popular && <div className="navex-badge">⭐ Mais Popular</div>}

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: plan.popular ? '#640cd6' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{plan.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice !== 'Grátis' && (
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>/mês</span>
                )}
              </div>
              {plan.monthlyPrice !== 'Grátis' && isYearly && (
                <p style={{ fontSize: 12, color: '#daeb44', fontWeight: 600 }}>Cobrado anualmente</p>
              )}
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>{plan.description}</p>
            </div>

            <div className="navex-sep" />

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {plan.features.map((f, fi) => (
                <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                  <CircleCheck size={16} style={{ color: plan.popular ? '#640cd6' : 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
                  {f.text}
                </li>
              ))}
            </ul>

            <button
              className={plan.popular ? 'navex-btn-primary' : 'navex-btn-outline'}
              onClick={() => { if (plan.button.url !== '#') window.open(plan.button.url, '_blank') }}
            >
              {plan.button.text}
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
