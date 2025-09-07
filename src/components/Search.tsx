import React from 'react';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="relative">
      <input
        placeholder="Tìm kiếm sản phẩm..."
        type="text"
        className="w-4xs rounded-full border-1 border-solid border-gray-500 px-10 py-2 text-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-blue-500"
      />
      <SearchIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default Search;
