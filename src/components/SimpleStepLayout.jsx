import React from 'react';

const SimpleStepLayout = ({ children, className = "", ...rest }) => {
    // Extract data-* attributes for CRO tracking
    const dataAttrs = {};
    Object.keys(rest).forEach(key => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = rest[key];
        }
    });

    return (
        <div className={`container animate-fade-in ${className}`} {...dataAttrs}>
            <div className="card glass-panel w-full">
                {children}
            </div>
        </div>
    );
};

export default SimpleStepLayout;
