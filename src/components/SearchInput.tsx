import React from 'react';
import Icon from './Icon';

const SearchInput = () => {
  return (
    <div className="flex w-full bg-dark-level-3 px-3 py-2 h-49">
      <input
        className="w-full h-9 rounded-lg pl-6 bg-dark-level-4 text-sm text-slate-400 outline-none"
        placeholder="Search or start a new conversation"></input>
      <Icon name="filter" alt="Filter unread messages" className="ml-2" />
    </div>
  );
};

export default SearchInput;
