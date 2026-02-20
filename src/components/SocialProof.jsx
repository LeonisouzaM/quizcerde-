import React from 'react';
import StepLayout from './StepLayout';
import { copy } from '../data/quizData';
import { Users, CheckCircle } from 'lucide-react';
import { CTA_IDS, FUNNEL_STEPS, trackSocialProofContinue } from '../utils/analytics';

const SocialProof = ({ onNext }) => {
    const { text, button } = copy.socialProof;

    const handleClick = () => {
        trackSocialProofContinue();
        onNext();
    };

    return (
        <StepLayout data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}>
            {/* Mechanic Image replacing the Icon */}
            <div className="mb-8 flex justify-center">
                <img
                    src="/mechanic-cert.jpg"
                    alt="Mecánico certificado"
                    className="rounded-lg shadow-lg object-cover"
                    style={{
                        width: '100%',
                        maxWidth: '280px',
                        height: 'auto',
                        maxHeight: '220px'
                    }}
                    width="280"
                    height="220"
                />
            </div>

            <div className="text-left mb-8 space-y-4">
                {text.map((paragraph, index) => (
                    <p key={index} className="flex gap-3">
                        <span className="text-primary mt-1 flex-shrink-0"><CheckCircle size={18} /></span>
                        <span>{paragraph}</span>
                    </p>
                ))}
            </div>
            <button
                id={CTA_IDS.QUIZ_SOCIALPROOF_CONTINUE}
                className="btn w-full"
                onClick={handleClick}
                data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}
                data-cta-position="1.2"
            >
                {button}
            </button>
        </StepLayout>
    );
};

export default SocialProof;
