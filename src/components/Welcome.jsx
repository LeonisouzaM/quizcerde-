import React, { memo, useEffect } from 'react';
import SimpleStepLayout from './SimpleStepLayout';
import { copy } from '../data/quizData';
import { CTA_IDS, FUNNEL_STEPS, trackFunnelStart } from '../utils/analytics';

const Welcome = memo(({ onNext }) => {
    const { title, text, button } = copy.welcome;

    useEffect(() => {
        trackFunnelStart();
    }, []);

    const handleClick = () => {
        onNext();
    };

    return (
        <SimpleStepLayout data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}>
            <div className="logo-area">
                <div className="icon-box" style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #22c55e, #15803d)', border: 'none', boxShadow: '0 8px 16px rgba(22, 163, 74, 0.3)' }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 64 64"
                        fill="none"
                    >
                        <path d="M18 18 L28 28 Q32 32 36 28 L46 18" stroke="white" strokeWidth="6" strokeLinecap="round" />
                        <path d="M18 46 L28 36 Q32 32 36 36 L46 46" stroke="white" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="32" cy="32" r="12" fill="white" />
                        <path d="M26 32 L30 36 L38 28" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <h1 className="text-center mb-6 text-primary">{title}</h1>
            <div className="text-left mb-8 space-y-4">
                {text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <button
                id={CTA_IDS.QUIZ_WELCOME_START}
                className="btn w-full"
                onClick={handleClick}
                data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}
                data-cta-position="1.1"
            >
                {button}
            </button>
        </SimpleStepLayout>
    );
});

export default Welcome;
