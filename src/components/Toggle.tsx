import classNames from 'classnames';
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
    <p className={classNames('select-none')}>
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
        className={classNames(
          'w-12 h-6 inline-flex items-center ml-2 rounded-full cursor-pointer transition-colors toggle',
          { 'bg-green-400': state[name], 'bg-gray-600': !state[name] }
        )}
      >
        <div
          className={classNames(
            'bg-white h-4 w-4 rounded-full transition-all mx-1 duration-300',
            { 'translate-x-6': state[name] }
          )}
        ></div>
      </div>
    </p>
  );
}
