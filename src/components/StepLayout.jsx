import { m } from 'framer-motion';

const StepLayout = ({ children, className = "", ...rest }) => {
    // Extract data-* attributes for CRO tracking
    const dataAttrs = {};
    Object.keys(rest).forEach(key => {
        if (key.startsWith('data-')) {
            dataAttrs[key] = rest[key];
        }
    });

    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`container ${className}`}
            {...dataAttrs}
        >
            <div className="card glass-panel w-full">
                {children}
            </div>
        </m.div>
    );
};

export default StepLayout;
