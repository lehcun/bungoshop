import React from 'react';

const StarRating = ({ count }: { count: number }) => {
  const validRating = Math.max(0, Math.min(count, 5));

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index}>{index < validRating ? '⭐' : '☆'}</span> // Chuyển qua dùng SVG trong tương lai
        ))}
    </div>
  );
};

export default StarRating;
