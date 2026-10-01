import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({
    rating = 0,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onChange,
    showValue = false,
    reviewCount = null,
    className = '',
}) => {
    const iconSizes = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-6 h-6',
    };

    const currentSize = iconSizes[size] || iconSizes.md;

    return (
        <div className={`inline-flex items-center gap-1 ${className}`}>
            {Array.from({ length: maxRating }).map((_, idx) => {
                const starValue = idx + 1;
                const isFilled = starValue <= Math.round(rating);

                return (
                    <Star
                        key={idx}
                        className={`${currentSize} ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                        onClick={() => interactive && onChange && onChange(starValue)}
                    />
                );
            })}

            {showValue && (
                <span className="text-sm font-bold text-slate-800 ml-1">
                    {Number(rating).toFixed(1)}
                </span>
            )}

            {reviewCount !== null && reviewCount !== undefined && (
                <span className="text-xs text-slate-500 font-normal">
                    ({reviewCount})
                </span>
            )}
        </div>
    );
};

export default RatingStars;
