import React, { useEffect, useState, useRef } from 'react';
import StepLayout from './StepLayout';
import { copy } from '../data/quizData';
import {
    CheckCircle2, ShieldCheck, Clock, Zap, Lock, CreditCard,
    MessageCircle, Users, FileText, QrCode, Mail, Database,
    ChevronDown
} from 'lucide-react';
import Testimonials from './Testimonials';
import {
    CTA_IDS,
    FUNNEL_STEPS,
    trackOfferView,
    trackCheckoutView,
    trackCheckoutCTAClick,
    trackCheckoutRedirect
} from '../utils/analytics';

/* ─── FAQ Data ─────────────────────────────────── */
const faqItems = [
    {
        q: "¿Qué es el Certificado del Manual del Mecánico?",
        a: "Es un documento digital profesional que valida tus conocimientos prácticos, diseñado para aumentar tu credibilidad y la confianza de tus clientes en el taller."
    },
    {
        q: "¿Para quién está dirigido este certificado?",
        a: "Para mecánicos automotrices, de motocicletas, diésel o generales que ya tienen experiencia y desean destacar su profesionalismo con un respaldo verificable."
    },
    {
        q: "¿Qué incluye el acceso que estoy pagando?",
        a: "Recibes tu certificado personalizado en PDF con código QR de validación en nuestro sistema, además de 3 bonos: Checklist de Diagnóstico, Guía de Torque y Plantilla de Presupuesto."
    },
    {
        q: "¿Cómo y cuándo recibiré el material?",
        a: "La entrega es automática e inmediata. En cuanto se confirma tu pago, llega directo a tu correo electrónico y a tu WhatsApp listo para descargar e imprimir."
    }
];

/* ─── FAQ Accordion Item ──────────────────────── */
const FaqItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            borderBottom: '1px solid #f3f4f6',
            overflow: 'hidden'
        }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '12px'
                }}
            >
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f2937', lineHeight: 1.35 }}>{item.q}</span>
                <ChevronDown
                    size={16}
                    style={{
                        flexShrink: 0,
                        color: '#16a34a',
                        transition: 'transform 0.2s',
                        transform: open ? 'rotate(180deg)' : 'rotate(0)'
                    }}
                />
            </button>
            <div style={{
                maxHeight: open ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.25s ease'
            }}>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.55, paddingBottom: '14px', margin: 0 }}>
                    {item.a}
                </p>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════ */
/* MAIN OFFER — MOBILE-FIRST OPTIMIZED            */
/* ═══════════════════════════════════════════════ */
const Offer = ({ onNext }) => {
    const { title, text, bonuses, sectionHeader } = copy.offer;
    const payment = copy.payment;
    const checkoutUrl = 'https://pay.hotmart.com/W104315897A?checkoutMode=10';

    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const timerRef = useRef(null);

    useEffect(() => {
        trackOfferView();

        if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
            const s = document.createElement('script');
            s.src = "https://fast.wistia.com/player.js";
            s.async = true;
            document.body.appendChild(s);
        }
        if (!document.querySelector('script[src*="jhnp0kvf2f.js"]')) {
            const s = document.createElement('script');
            s.src = "https://fast.wistia.com/embed/jhnp0kvf2f.js";
            s.async = true;
            s.type = "module";
            document.body.appendChild(s);
        }

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    const fmt = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const handleCTA = () => {
        trackCheckoutCTAClick();
        trackCheckoutRedirect(checkoutUrl);
        window.open(checkoutUrl, '_blank');
    };

    /* Feature icons for 2-col grid */
    const featureIcons = [
        { icon: <FileText size={20} />, label: "PDF listo para imprimir" },
        { icon: <QrCode size={20} />, label: "Código exclusivo de validación" },
        { icon: <Mail size={20} />, label: "Envío por WhatsApp y e-mail" },
        { icon: <Database size={20} />, label: "Registro para verificación" }
    ];

    return (
        <StepLayout data-funnel-step={FUNNEL_STEPS.STEP_02_OFERTA_PRINCIPAL}>

            {/* ─── ABOVE THE FOLD ──────────────────────── */}

            {/* Timer */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '6px',
                padding: '8px 12px', marginBottom: '12px', width: '100%'
            }}>
                <Clock size={15} style={{ color: '#92400e' }} />
                <span style={{ color: '#92400e', fontWeight: 600, fontSize: '0.85rem' }}>
                    Oferta expira en <strong style={{ color: '#dc2626' }}>{fmt(timeLeft)}</strong>
                </span>
            </div>

            {/* Headline — Bold, compact */}
            <h2 style={{
                textAlign: 'center',
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 900,
                fontSize: '1.35rem',
                lineHeight: 1.2,
                color: '#111827',
                marginBottom: '10px',
                padding: '0 4px'
            }}>
                {title}
            </h2>

            {/* Compact Video */}
            <div style={{
                width: '100%', maxWidth: '260px', margin: '0 auto 12px',
                borderRadius: '10px', overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '2px solid #16a34a'
            }}>
                <wistia-player media-id="jhnp0kvf2f" aspect="0.5625" player-color="#16a34a"></wistia-player>
            </div>

            {/* Price Card — Visible without scroll */}
            <div style={{
                border: '2px solid #16a34a', borderRadius: '12px',
                padding: '16px', textAlign: 'center',
                marginBottom: '12px', background: '#fafffe'
            }}>
                <p style={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '2px' }}>
                    PAGO ÚNICO
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.82rem', marginBottom: '2px' }}>
                    $ <span style={{ textDecoration: 'line-through', color: '#ef4444' }}>{payment.originalPrice.replace('$ ', '')}</span>
                </p>
                <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#16a34a', lineHeight: 1, marginBottom: '6px' }}>
                    {payment.price}
                </p>
                <span style={{
                    display: 'inline-block', background: '#dcfce7', color: '#16a34a',
                    fontWeight: 700, fontSize: '0.7rem', padding: '3px 10px',
                    borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                    {payment.savings}
                </span>
            </div>

            {/* CTA — Full width, vibrant green */}
            <button
                id={CTA_IDS.CHECKOUT_UNLOCK_CERTIFICATE}
                onClick={handleCTA}
                data-funnel-step={FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT}
                data-cta-position="2.2"
                style={{
                    width: '100%', padding: '16px',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: '#fff', fontWeight: 800, fontSize: '1.05rem',
                    borderRadius: '10px', border: 'none', cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.4)',
                    marginBottom: '6px'
                }}
            >
                {payment.button}
            </button>
            <p style={{ textAlign: 'center', color: '#16a34a', fontWeight: 600, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '6px' }}>
                <Zap size={13} /> {payment.ctaText}
            </p>

            {/* Trust row */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '10px', flexWrap: 'wrap', fontSize: '0.7rem', color: '#6b7280',
                marginBottom: '8px'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Lock size={11} /> Pago seguro</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><CreditCard size={11} /> OXXO / SPEI</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageCircle size={11} /> WhatsApp</span>
            </div>

            {/* Payment badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
                {['Visa', 'Mastercard', 'OXXO', 'SPEI'].map(m => (
                    <span key={m} style={{
                        padding: '3px 8px', border: '1px solid #d1d5db', borderRadius: '4px',
                        fontSize: '0.65rem', fontWeight: 600,
                        color: m === 'Mastercard' ? '#ef4444' : m === 'OXXO' ? '#f59e0b' : m === 'SPEI' ? '#16a34a' : '#1f2937',
                        background: '#fff'
                    }}>{m}</span>
                ))}
            </div>


            {/* ─── BENEFITS — 2-Column Icon Grid ───────── */}

            <div style={{ width: '100%', height: '1px', background: '#f3f4f6', margin: '0 0 16px' }} />

            <h4 style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#111827', marginBottom: '12px' }}>
                {payment.featuresTitle}
            </h4>

            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
                marginBottom: '16px'
            }}>
                {featureIcons.map((f, i) => (
                    <div key={i} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        textAlign: 'center', padding: '14px 8px',
                        background: '#f0fdf4', borderRadius: '10px',
                        border: '1px solid #bbf7d0', gap: '6px'
                    }}>
                        <span style={{ color: '#16a34a' }}>{f.icon}</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#166534', lineHeight: 1.3 }}>{f.label}</span>
                    </div>
                ))}
            </div>


            {/* ─── BONUSES — Compact ──────────────────── */}

            <h4 style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#111827', marginBottom: '10px' }}>
                {sectionHeader}
            </h4>

            <div style={{ marginBottom: '16px' }}>
                {bonuses.map((b, i) => (
                    <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        marginBottom: '10px'
                    }}>
                        <CheckCircle2 size={20} style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px' }} strokeWidth={2.5} />
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#16a34a' }}>{b.title}</span>
                            <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '2px 0 0', lineHeight: 1.4 }}>{b.description}</p>
                        </div>
                    </div>
                ))}
            </div>


            {/* ─── GUARANTEE ──────────────────────────── */}

            <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                border: '1px solid #bbf7d0', borderRadius: '10px',
                padding: '12px 14px', marginBottom: '16px', background: '#f0fdf4'
            }}>
                <ShieldCheck size={24} style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px' }} />
                <div>
                    <h5 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1f2937', marginBottom: '3px' }}>
                        {payment.guaranteeTitle}
                    </h5>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.45, margin: 0 }}>
                        {payment.guaranteeText}
                    </p>
                </div>
            </div>


            {/* ─── 2nd CTA ────────────────────────────── */}

            <button
                onClick={handleCTA}
                style={{
                    width: '100%', padding: '16px',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: '#fff', fontWeight: 800, fontSize: '1.05rem',
                    borderRadius: '10px', border: 'none', cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.4)',
                    marginBottom: '16px'
                }}
            >
                {payment.button}
            </button>


            {/* ─── TESTIMONIALS — Compact Grid ────────── */}

            <div style={{ width: '100%', height: '1px', background: '#f3f4f6', margin: '0 0 8px' }} />
            <Testimonials />


            {/* ─── FAQ ACCORDION ──────────────────────── */}

            <div style={{ width: '100%', height: '1px', background: '#f3f4f6', margin: '16px 0' }} />

            <h4 style={{ textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: '#111827', marginBottom: '8px' }}>
                Preguntas Frecuentes
            </h4>

            <div style={{ marginBottom: '16px' }}>
                {faqItems.map((item, i) => (
                    <FaqItem key={i} item={item} />
                ))}
            </div>


            {/* ─── SOCIAL PROOF + FOOTER ──────────────── */}

            <p style={{
                textAlign: 'center', fontSize: '0.78rem', color: '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '5px', marginBottom: '8px'
            }}>
                <Users size={14} style={{ color: '#6b7280' }} />
                <strong>{payment.socialProofCount}</strong>
            </p>

            <p style={{ fontSize: '0.6rem', color: '#d1d5db', textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
                {payment.footerText}
            </p>

        </StepLayout>
    );
};

export default Offer;
