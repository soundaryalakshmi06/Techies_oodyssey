import React from 'react';

export const Card = ({
    children,
    className = '',
    onClick,
    hoverable = false,
    bordered = true,
    padding = 'p-6',
    ...props
}) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl ${padding} ${bordered ? 'border border-slate-200/80 shadow-sm' : ''
                } ${hoverable
                    ? 'transition-all duration-200 hover:shadow-md hover:border-brand-300 hover:-translate-y-0.5 cursor-pointer'
                    : ''
                } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
