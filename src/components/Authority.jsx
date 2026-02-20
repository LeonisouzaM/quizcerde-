import React from 'react';
import StepLayout from './StepLayout';
import { copy } from '../data/quizData';
import { CTA_IDS, FUNNEL_STEPS, trackAuthorityBegin } from '../utils/analytics';

const Authority = ({ onNext }) => {
    const { title, text, button } = copy.authority;

    const handleClick = () => {
        trackAuthorityBegin();
        onNext();
    };

    return (
        <StepLayout data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}>
            {/* Certificate Image */}
            <div className="mb-6 flex justify-center">
                <img
                    src="/authority-cert.jpg"
                    className="rounded-lg shadow-lg w-full max-w-md object-cover"
                    style={{ maxHeight: '300px' }}
                    width="400"
                    height="300"
                />
            </div>

            <h2 className="text-center font-bold text-2xl mb-6 text-text-highlight uppercase tracking-wide">
                {title}
            </h2>

            <div className="text-left mb-8 space-y-4 text-text-muted leading-relaxed">
                {text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            <button
                id={CTA_IDS.QUIZ_AUTHORITY_BEGIN}
                className="btn w-full btn-primary font-bold text-lg py-3"
                onClick={handleClick}
                data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}
                data-cta-position="1.4"
            >
                {button}
            </button>
        </StepLayout>
    );
};

export default Authority;
