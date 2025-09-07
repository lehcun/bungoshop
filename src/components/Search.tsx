import React from 'react';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="relative">
      <input
        placeholder="Nhập gì đó"
        type="text"
        className="flex-1 rounded-full border-1 border-solid border-gray-500 px-10 py-3 text-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-blue-500 md:w-sm lg:w-lg"
      />
      <SearchIcon className="absolute top-1/2 left-2.5 -translate-y-1/2 text-gray-500" />
      <button className="absolute top-1 right-2.5 cursor-pointer rounded-full bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600">
        Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
