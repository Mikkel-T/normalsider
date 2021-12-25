import {
  ChevronDownIcon,
  ChevronRightIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
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
        className="inline-block font-bold align-middle cursor-pointer select-none"
      >
        {settingsOpen ? (
          <ChevronDownIcon className="inline-block w-5 h-5 align-middle" />
        ) : (
          <ChevronRightIcon className="inline-block w-5 h-5 align-middle" />
        )}
        Indstillinger
      </div>
      <br />
      {settingsOpen && (
        <div className="inline-block p-1 px-7 bg-gray-100 rounded-xl">
          <div className="my-2">
            <p className="font-semibold">
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
          <div className="my-2">
            <p className="font-semibold">Antal talte tegn per normalside:</p>
            <input
              onChange={(e) => {
                setCharsPerPage(e.target.value);
                localStorage.setItem('charsPerPage', e.target.value);
              }}
              type="number"
              value={charsPerPage}
              className="p-2 rounded-md border outline-none focus:border-gray-500"
            />
          </div>
          <div className="my-2">
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
              className="p-2 px-2 mt-3 text-gray-50 bg-red-600 rounded-md hover:bg-red-500 focus:bg-red-500 focus:outline-none"
            >
              <RefreshIcon className="inline-block mr-1 w-5 h-5" />
              Nulstil indstillinger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
