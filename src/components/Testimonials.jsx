import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

const testimonials = [
    {
        name: "Pedro R.",
        location: "Monterrey, NL",
        text: "Ya lo puse en el taller y los clientes hasta me tratan con más respeto. ¡Sí conviene!",
        evidence: "/mechanic-evidence-1.jpg"
    },
    {
        name: "Jose L.",
        location: "CDMX",
        text: "Por el precio está regalado. El examen no está difícil si le sabes. 100% recomendado.",
        evidence: "/mechanic-evidence-2.jpg"
    },
    {
        name: "Mateo R.",
        location: "Guadalajara, JAL",
        text: "20 años en la chamba y nunca tuve un papel. Ahora cobro mejor mis reparaciones.",
        evidence: "/mechanic-evidence-3.jpg"
    },
    {
        name: "Javier H.",
        location: "Puebla, PUE",
        text: "Me llegó el PDF al toque. Lo imprimí y se ve de lujo en la pared del taller.",
        evidence: "/mechanic-evidence-4.jpg"
    }
];

const Testimonials = () => {
    return (
        <div style={{ width: '100%', padding: '12px 0' }}>
            <h4 style={{
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '14px',
                lineHeight: '1.3'
            }}>
                Lo que dice la raza <span style={{ color: '#16a34a' }}>Certificada</span> 🇲🇽
            </h4>

            {/* 2-Column Compact Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
            }}>
                {testimonials.map((t, i) => (
                    <div key={i} style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                        border: '1px solid #f3f4f6',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        {/* Evidence Photo */}
                        <div style={{
                            width: '100%',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            aspectRatio: '4/3',
                            background: '#f9fafb'
                        }}>
                            <img
                                src={t.evidence}
                                alt={`Certificado de ${t.name}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: '1px' }}>
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} size={12} fill="#fbbf24" color="#fbbf24" strokeWidth={0} />
                            ))}
                        </div>

                        {/* Quote */}
                        <p style={{
                            fontSize: '0.72rem',
                            lineHeight: '1.45',
                            color: '#374151',
                            fontStyle: 'italic',
                            margin: 0
                        }}>
                            "{t.text}"
                        </p>

                        {/* Name + Location */}
                        <div>
                            <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#111827', margin: 0, lineHeight: 1.2 }}>{t.name}</p>
                            <p style={{ fontSize: '0.62rem', color: '#9ca3af', margin: 0, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{t.location}</p>
                        </div>

                        {/* Verified */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.6rem', fontWeight: '700', color: '#15803d',
                            paddingTop: '6px', borderTop: '1px solid #f3f4f6', marginTop: 'auto'
                        }}>
                            <CheckCircle2 size={12} color="#16a34a" strokeWidth={3} />
                            VERIFICADA
                        </div>
                    </div>
                ))}
            </div>

            {/* Social Proof Badge */}
            <div style={{
                marginTop: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', color: '#16a34a', fontSize: '0.75rem', fontWeight: '700',
                backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0',
                padding: '8px 16px', borderRadius: '9999px',
                width: 'fit-content', margin: '16px auto 0'
            }}>
                <span style={{ fontSize: '14px' }}>🇲🇽</span>
                <span>+2,847 mecánicos certificados</span>
            </div>
        </div>
    );
};

export default Testimonials;
