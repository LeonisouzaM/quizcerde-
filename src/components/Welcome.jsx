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
            <div className="mb-6 flex justify-center">
                <img
                    src="/mechanic-cert.jpg"
                    alt="Mecánico certificado"
                    className="rounded-lg shadow-lg object-cover"
                    style={{
                        width: '100%',
                        maxWidth: '240px',
                        height: 'auto',
                        maxHeight: '180px'
                    }}
                    width="240"
                    height="180"
                />
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
