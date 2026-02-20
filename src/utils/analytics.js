/**
 * ============================================================
 * ANALYTICS & CRO TRACKING UTILITY
 * ============================================================
 * 
 * Funnel Structure (CRO-Oriented):
 * 
 *   Step_01_Quiz_Avaliacao
 *     ├── 1.1  Welcome           → Quiz_Welcome_Start
 *     ├── 1.2  SocialProof       → Quiz_SocialProof_Continue
 *     ├── 1.3  AreaSelection     → Quiz_Area_Select
 *     ├── 1.4  Authority         → Quiz_Authority_Begin
 *     ├── 1.5–1.13  Questions    → Quiz_Question_{N}_Answer
 *     └── 1.14 Loading           → Quiz_Loading_Complete
 * 
 *   Step_02_Oferta_Principal
 *     ├── 2.1  Result            → Oferta_Result_Continue
 *     └── 2.2  Offer + Payment   → Checkout_Redirect (unified)
 * 
 *   Step_03_Checkout_Redirect
 *     └── 3.1  Certificate       → Checkout_Download_PDF
 * 
 * ============================================================
 */

// ── Funnel Step Constants ──────────────────────────────────────

export const FUNNEL_STEPS = {
    STEP_01_QUIZ_AVALIACAO: 'Step_01_Quiz_Avaliacao',
    STEP_02_OFERTA_PRINCIPAL: 'Step_02_Oferta_Principal',
    STEP_03_CHECKOUT_REDIRECT: 'Step_03_Checkout_Redirect',
};

// ── CTA Button IDs (unique per funnel element) ────────────────

export const CTA_IDS = {
    // Step 01 — Quiz & Avaliação
    QUIZ_WELCOME_START: 'cta_quiz_welcome_start',
    QUIZ_SOCIALPROOF_CONTINUE: 'cta_quiz_socialproof_continue',
    QUIZ_AREA_SELECT: 'cta_quiz_area_select',
    QUIZ_AUTHORITY_BEGIN: 'cta_quiz_authority_begin',
    QUIZ_QUESTION_ANSWER: 'cta_quiz_question_answer', // appended with _q{N}
    QUIZ_LOADING_COMPLETE: 'cta_quiz_loading_complete',

    // Step 02 — Oferta Principal
    OFERTA_RESULT_CONTINUE: 'cta_oferta_result_continue',
    OFERTA_VSL_CTA: 'cta_oferta_vsl_cta',

    // Step 03 — Checkout & Redirect
    CHECKOUT_UNLOCK_CERTIFICATE: 'cta_checkout_unlock_certificate',
    CHECKOUT_SIMULATE_PAYMENT: 'cta_checkout_simulate_payment',
    CHECKOUT_DOWNLOAD_PDF: 'cta_checkout_download_pdf',
};

// ── GA4 Event Names ───────────────────────────────────────────

export const GA4_EVENTS = {
    // Step 01 events
    FUNNEL_START: 'funnel_start',
    QUIZ_SOCIAL_PROOF_VIEW: 'quiz_social_proof_view',
    QUIZ_AREA_SELECTED: 'quiz_area_selected',
    QUIZ_AUTHORITY_VIEW: 'quiz_authority_view',
    QUIZ_QUESTION_ANSWERED: 'quiz_question_answered',
    QUIZ_COMPLETED: 'quiz_completed',

    // Step 02 events
    RESULT_VIEW: 'result_view',
    RESULT_CONTINUE: 'result_continue',
    OFFER_VIEW: 'offer_view',
    OFFER_CTA_CLICK: 'offer_cta_click',

    // Step 03 events
    CHECKOUT_VIEW: 'checkout_view',
    CHECKOUT_CTA_CLICK: 'checkout_cta_click',
    CHECKOUT_REDIRECT: 'checkout_redirect',
    CERTIFICATE_VIEW: 'certificate_view',
    CERTIFICATE_DOWNLOAD: 'certificate_download',
};

// ── Core Tracking Function ────────────────────────────────────

/**
 * Sends a custom event to GA4 via gtag.
 * Also pushes to dataLayer for GTM compatibility.
 * 
 * @param {string} eventName - GA4 event name (use GA4_EVENTS constants)
 * @param {Object} params - Event parameters
 */
export function trackEvent(eventName, params = {}) {
    const eventData = {
        event_category: params.funnel_step || 'funnel',
        event_label: params.cta_id || eventName,
        funnel_step: params.funnel_step || '',
        cta_id: params.cta_id || '',
        timestamp: new Date().toISOString(),
        ...params,
    };

    // GA4 via gtag
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventData);
    }

    // GTM dataLayer push
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...eventData,
        });
    }

    // Meta Pixel standard events exactly as mapped (no custom events, no unnecessary params)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        const standardEventMapping = {
            'funnel_start': { name: 'ViewContent' },
            'result_view': { name: 'Lead' }, // Final do Quiz (quando vira lead)
            'offer_view': { name: 'ViewContent' } // Página de Vendas (SPA)
            // REMOVED: checkout_view (InitiateCheckout) so it NEVER fires in the SPA. 
            // The Checkout URL (Hotmart) handles its own InitiateCheckout.
        };

        const fbqEvent = standardEventMapping[eventName];
        if (fbqEvent) {
            if (fbqEvent.name === 'Lead') {
                if (!window.leadTracked) {
                    window.fbq('track', 'Lead');
                    window.leadTracked = true;
                }
            } else if (fbqEvent.body) {
                window.fbq('track', fbqEvent.name, fbqEvent.body);
            } else {
                window.fbq('track', fbqEvent.name);
            }
        }
    }

    // Debug logging in development
    if (import.meta.env.DEV) {
        console.log(
            `%c[CRO Track] %c${eventName}`,
            'color: #10b981; font-weight: bold;',
            'color: #0284c7; font-weight: bold;',
            eventData
        );
    }
}

// ── Convenience Tracking Functions ────────────────────────────

/** Step 01: Quiz Avaliação */

export function trackFunnelStart() {
    trackEvent(GA4_EVENTS.FUNNEL_START, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: CTA_IDS.QUIZ_WELCOME_START,
        step_position: '1.1',
        step_label: 'Welcome',
    });
}

export function trackSocialProofContinue() {
    trackEvent(GA4_EVENTS.QUIZ_SOCIAL_PROOF_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: CTA_IDS.QUIZ_SOCIALPROOF_CONTINUE,
        step_position: '1.2',
        step_label: 'SocialProof',
    });
}

export function trackAreaSelected(area) {
    trackEvent(GA4_EVENTS.QUIZ_AREA_SELECTED, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: CTA_IDS.QUIZ_AREA_SELECT,
        step_position: '1.3',
        step_label: 'AreaSelection',
        selected_area: area,
    });
}

export function trackAuthorityBegin() {
    trackEvent(GA4_EVENTS.QUIZ_AUTHORITY_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: CTA_IDS.QUIZ_AUTHORITY_BEGIN,
        step_position: '1.4',
        step_label: 'Authority',
    });
}

export function trackQuestionAnswered(questionIndex, questionId, isCorrect) {
    trackEvent(GA4_EVENTS.QUIZ_QUESTION_ANSWERED, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: `${CTA_IDS.QUIZ_QUESTION_ANSWER}_q${questionIndex + 1}`,
        step_position: `1.${5 + questionIndex}`,
        step_label: `Question_${questionIndex + 1}`,
        question_id: questionId,
        question_number: questionIndex + 1,
        is_correct: isCorrect,
    });
}

export function trackQuizCompleted() {
    trackEvent(GA4_EVENTS.QUIZ_COMPLETED, {
        funnel_step: FUNNEL_STEPS.STEP_01_QUIZ_AVALIACAO,
        cta_id: CTA_IDS.QUIZ_LOADING_COMPLETE,
        step_position: '1.14',
        step_label: 'Loading_Complete',
    });
}

/** Step 02: Oferta Principal */

export function trackResultView() {
    trackEvent(GA4_EVENTS.RESULT_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_02_OFERTA_PRINCIPAL,
        cta_id: CTA_IDS.OFERTA_RESULT_CONTINUE,
        step_position: '2.1',
        step_label: 'Result',
    });
}

export function trackResultContinue() {
    trackEvent(GA4_EVENTS.RESULT_CONTINUE, {
        funnel_step: FUNNEL_STEPS.STEP_02_OFERTA_PRINCIPAL,
        cta_id: CTA_IDS.OFERTA_RESULT_CONTINUE,
        step_position: '2.1',
        step_label: 'Result_CTA',
    });
}

export function trackOfferView() {
    trackEvent(GA4_EVENTS.OFFER_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_02_OFERTA_PRINCIPAL,
        cta_id: CTA_IDS.OFERTA_VSL_CTA,
        step_position: '2.2',
        step_label: 'Offer',
    });
}

export function trackOfferCTAClick() {
    trackEvent(GA4_EVENTS.OFFER_CTA_CLICK, {
        funnel_step: FUNNEL_STEPS.STEP_02_OFERTA_PRINCIPAL,
        cta_id: CTA_IDS.OFERTA_VSL_CTA,
        step_position: '2.2',
        step_label: 'Offer_CTA',
    });
}

/** Step 03: Checkout & Redirect */

export function trackCheckoutView() {
    trackEvent(GA4_EVENTS.CHECKOUT_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT,
        cta_id: CTA_IDS.CHECKOUT_UNLOCK_CERTIFICATE,
        step_position: '3.1',
        step_label: 'Payment',
    });
}

export function trackCheckoutCTAClick() {
    trackEvent(GA4_EVENTS.CHECKOUT_CTA_CLICK, {
        funnel_step: FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT,
        cta_id: CTA_IDS.CHECKOUT_UNLOCK_CERTIFICATE,
        step_position: '3.1',
        step_label: 'Payment_CTA',
    });
}

export function trackCheckoutRedirect(url) {
    trackEvent(GA4_EVENTS.CHECKOUT_REDIRECT, {
        funnel_step: FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT,
        cta_id: CTA_IDS.CHECKOUT_UNLOCK_CERTIFICATE,
        step_position: '3.1',
        step_label: 'Checkout_Redirect',
        redirect_url: url,
    });
}

export function trackCertificateView() {
    trackEvent(GA4_EVENTS.CERTIFICATE_VIEW, {
        funnel_step: FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT,
        cta_id: CTA_IDS.CHECKOUT_DOWNLOAD_PDF,
        step_position: '3.2',
        step_label: 'Certificate',
    });
}

export function trackCertificateDownload(userName) {
    trackEvent(GA4_EVENTS.CERTIFICATE_DOWNLOAD, {
        funnel_step: FUNNEL_STEPS.STEP_03_CHECKOUT_REDIRECT,
        cta_id: CTA_IDS.CHECKOUT_DOWNLOAD_PDF,
        step_position: '3.2',
        step_label: 'Certificate_Download',
        user_name: userName,
    });
}
