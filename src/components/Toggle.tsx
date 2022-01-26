import React from 'react';

export default function Link({
  onChange,
  name,
  state,
  title,
}: {
  onChange(state: Record<string, boolean>): void;
  name: string;
  state: Record<string, boolean>;
  title: string;
}) {
  return (
    <p className="select-none">
      {title}{' '}
      <div
        onClick={() => {
          const newState = {
            ...state,
            [name]: !state[name],
          };
          onChange(newState);
          localStorage.setItem('charsToCount', JSON.stringify(newState));
        }}
        className={`group ml-2 inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors
          ${state[name] ? 'bg-green-400' : 'bg-gray-600'}
        `}
      >
        <div
          className={`mx-1 h-4 w-4 rounded-full bg-white transition-all duration-300 group-hover:ring-8 ${
            state[name] && 'translate-x-6'
          }`}
        ></div>
      </div>
    </p>
  );
}
