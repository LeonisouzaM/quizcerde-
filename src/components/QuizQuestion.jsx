import React, { useState } from 'react';
import StepLayout from './StepLayout';
import { motion } from 'framer-motion';
import { CTA_IDS, FUNNEL_STEPS, trackQuestionAnswered } from '../utils/analytics';

const QuizQuestion = ({ questionData, onAnswer, currentQuestionIndex, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option, index) => {
        setSelectedOption(index);

        // Track question answer with GA4
        trackQuestionAnswered(currentQuestionIndex, questionData.id, option.correct);

        // Add small delay to show selection
        setTimeout(() => {
            onAnswer(option);
            setSelectedOption(null);
        }, 400);
    };

    const progress = ((currentQuestionIndex) / totalQuestions) * 100;

    return (
        <>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <StepLayout data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}>
                <span className="text-sm text-text-muted mb-4 block text-center uppercase tracking-widest">
                    Pregunta {currentQuestionIndex + 1}/{totalQuestions}
                </span>
                <h3 className="mb-8 font-bold text-xl">{questionData.question}</h3>
                <div className="space-y-3">
                    {questionData.options.map((option, index) => (
                        <button
                            key={index}
                            id={`${CTA_IDS.QUIZ_QUESTION_ANSWER}_q${currentQuestionIndex + 1}_opt${index + 1}`}
                            className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option, index)}
                            disabled={selectedOption !== null}
                            data-funnel-step={FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO}
                            data-cta-position={`1.${5 + currentQuestionIndex}`}
                            data-question-id={questionData.id}
                            data-option-index={index}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </StepLayout>
        </>
    );
};

export default QuizQuestion;
