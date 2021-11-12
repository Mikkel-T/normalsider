import {
  ChevronDownIcon,
  ChevronRightIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { useState } from 'react';

import CharsToCount from './Toggle';

export default function Settings({
  charsToCount,
  setCharsToCount,
  charsPerPage,
  setCharsPerPage,
}: {
  charsToCount: Record<string, boolean>;
  setCharsToCount(charsToCount: Record<string, boolean>): void;
  charsPerPage: string | number;
  setCharsPerPage(charsPerPage: string | number): void;
}) {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setSettingsOpen(!settingsOpen)}
        className={classNames(
          'inline-block font-bold align-middle cursor-pointer select-none'
        )}
      >
        {settingsOpen ? (
          <ChevronDownIcon
            className={classNames('inline-block w-5 h-5 align-middle')}
          />
        ) : (
          <ChevronRightIcon
            className={classNames('inline-block w-5 h-5 align-middle')}
          />
        )}
        Indstillinger
      </div>
      <br />
      {settingsOpen && (
        <div
          className={classNames('rounded-xl px-7 inline-block p-1 bg-gray-100')}
        >
          <div className={classNames('my-2')}>
            <p className={classNames('font-semibold')}>
              Vælg hvilke slags tegn der skal tælles med:
            </p>
            {Object.keys(charsToCount).map((i) => (
              <CharsToCount
                key={i}
                name={i}
                title={
                  i !== 'andre'
                    ? i.charAt(0).toUpperCase() + i.slice(1)
                    : 'Alle andre tegn'
                }
                onChange={setCharsToCount}
                state={charsToCount}
              />
            ))}
          </div>
          <div className={classNames('my-2')}>
            <p className={classNames('font-semibold')}>
              Antal talte tegn per normalside:
            </p>
            <input
              onChange={(e) => {
                setCharsPerPage(e.target.value);
                localStorage.setItem('charsPerPage', e.target.value);
              }}
              type="number"
              value={charsPerPage}
              className={classNames(
                'focus:border-gray-500 p-2 border rounded-md outline-none'
              )}
            />
          </div>
          <div className={classNames('my-2')}>
            <button
              onClick={() => {
                setCharsToCount({
                  bogstaver: true,
                  tal: true,
                  mellemrum: false,
                  andre: false,
                });
                setCharsPerPage(1300);
                localStorage.clear();
              }}
              className={classNames(
                'text-gray-50 focus:outline-none hover:bg-red-500 focus:bg-red-500 p-2 px-2 mt-3 bg-red-600 rounded-md'
              )}
            >
              <RefreshIcon
                className={classNames('inline-block w-5 h-5 mr-1')}
              />
              Nulstil indstillinger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
