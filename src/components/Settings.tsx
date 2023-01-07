import {
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
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
        className="inline-block cursor-pointer select-none align-middle font-bold"
      >
        {settingsOpen ? (
          <ChevronDownIcon className="inline-block h-5 w-5 align-middle" />
        ) : (
          <ChevronRightIcon className="inline-block h-5 w-5 align-middle" />
        )}
        Indstillinger
      </div>
      <br />
      {settingsOpen && (
        <div className="inline-block rounded-xl bg-gray-100 p-1 px-7">
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
              className="rounded-md border p-2 outline-none focus:border-gray-500"
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
              className="mt-3 rounded-md bg-red-600 p-2 px-2 text-gray-50 hover:bg-red-500 focus:bg-red-500 focus:outline-none"
            >
              <ArrowPathIcon className="mr-1 inline-block h-5 w-5" />
              Nulstil indstillinger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
