import { useProductFilter } from '@/hook/store/useProductFilter';
import React from 'react';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { page, setPage } = useProductFilter();

  if (totalPages <= 1) return null;

  const handleClick = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="mt-6 flex justify-center gap-2">
      {page > 1 && (
        <button
          onClick={() => handleClick(page - 1)}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &lt; Trước
        </button>
      )}

      {Array.from({ length: totalPages }).map((_, i) => {
        const current = i + 1;
        return (
          <button
            key={i}
            onClick={() => handleClick(current)}
            className={`rounded border px-3 py-1 ${
              current === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {current}
          </button>
        );
      })}

      {page < totalPages && (
        <button
          onClick={() => handleClick(page + 1)}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          Sau &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
