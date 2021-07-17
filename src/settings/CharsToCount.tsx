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
        className={`w-10 h-5 inline-flex items-center ml-2 rounded-full cursor-pointer transition-colors ${
          state[name] ? 'bg-green-400' : 'bg-gray-600'
        }`}
      >
        <div
          className={`bg-white h-4 w-4 rounded-full transition-all  mx-0.5 ${
            state[name] && 'translate-x-5'
          }`}
        ></div>
      </div>
    </p>
  );
}
