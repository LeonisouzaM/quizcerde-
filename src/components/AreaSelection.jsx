import React from 'react';
import StepLayout from './StepLayout';
import { copy } from '../data/quizData';
import { Settings } from 'lucide-react';
import { CTA_IDS, FUNNEL_STEPS, trackAreaSelected } from '../utils/analytics';

const AreaSelection = ({ onNext, setArea }) => {
    const { question, options } = copy.areaSelection;

    const handleSelect = (option) => {
        trackAreaSelected(option);
        setArea(option);
        onNext();
    };

    return (
        <StepLayout data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}>
            <div className="logo-area">
                <div className="icon-box">
                    <Settings size={32} />
                </div>
            </div>
            <h2 className="text-center mb-8">{question}</h2>
            <div className="space-y-3">
                {options.map((option, index) => (
                    <button
                        key={index}
                        id={`${CTA_IDS.QUIZ_AREA_SELECT}_option_${index + 1}`}
                        className="quiz-option text-center justify-center font-bold"
                        onClick={() => handleSelect(option)}
                        data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}
                        data-cta-position="1.3"
                        data-option-value={option}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </StepLayout>
    );
};

export default AreaSelection;
