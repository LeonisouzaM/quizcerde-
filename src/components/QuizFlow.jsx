import React, { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import Loading from './Loading';

// Lazy load components
const SocialProof = lazy(() => import('./SocialProof'));
const AreaSelection = lazy(() => import('./AreaSelection'));
const Authority = lazy(() => import('./Authority'));
const QuizQuestion = lazy(() => import('./QuizQuestion'));
const Result = lazy(() => import('./Result'));
const Offer = lazy(() => import('./Offer'));
const Certificate = lazy(() => import('./Certificate'));

/**
 * QuizFlow — Funnel Orchestrator
 *
 * Step_01_Quiz_Avaliacao:  steps 2–14
 *   2   → SocialProof
 *   3   → AreaSelection
 *   4   → Authority
 *   5–13→ QuizQuestions (9 questions)
 *   14  → Loading
 *
 * Step_02_Oferta_Principal: steps 15–16
 *   15  → Result
 *   16  → Offer + Payment (unified → checkout redirect)
 *
 * Step_03_Checkout_Redirect: step 17
 *   17  → Certificate (post-conversion)
 */
const QuizFlow = ({ step, onNext, setArea, handleAnswer, currentQuestionData, totalQuestions }) => {
    return (
        <LazyMotion features={domAnimation}>
            <Suspense fallback={<div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#16a34a]"></div></div>}>

                {/* ── Step_01_Quiz_Avaliacao ───────────────── */}
                {step === 2 && <SocialProof onNext={onNext} />}
                {step === 3 && <AreaSelection onNext={onNext} setArea={setArea} />}
                {step === 4 && <Authority onNext={onNext} />}

                {step >= 5 && step < 14 && (
                    <QuizQuestion
                        questionData={currentQuestionData}
                        onAnswer={handleAnswer}
                        currentQuestionIndex={step - 5}
                        totalQuestions={totalQuestions}
                    />
                )}

                {step === 14 && <Loading onComplete={onNext} />}

                {/* ── Step_02_Oferta_Principal ─────────────── */}
                {step === 15 && <Result onNext={onNext} />}
                {step === 16 && <Offer onNext={onNext} />}

                {/* ── Step_03_Checkout_Redirect ────────────── */}
                {step === 17 && <Certificate />}

            </Suspense>
        </LazyMotion>
    );
};

export default QuizFlow;
