import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Link from './Link';

function App() {
  const [text, setText] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [charsPerPage, setCharsPerPage] = useState<number | string>(1300);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  useEffect(() => {
    const chars = localStorage.getItem('charsPerPage');
    if (chars) {
      setCharsPerPage(+chars);
    }
  }, []);

  useEffect(() => {
    const arr = text.match(/[A-ZÀ-ÚÄ-Ü0-9]/gi);
    setCount(arr ? arr.length : 0);
  }, [text]);

  return (
    <div className="text-center">
      <main>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="md:w-1/2 focus:outline-none h-60 sm:w-2/3 w-3/4 p-2 mt-5 mb-2 border border-black rounded-lg resize-y"
          aria-label="Tekst input"
        />
        {text && <div>Antal tegn: {text.length}</div>}
        {count > 0 && (
          <>
            <div>Antal bogstaver og tal: {count}</div>
            <div>
              Normalsider:{' '}
              {(charsPerPage && count / +charsPerPage) ||
                'Ikke beregnet da indstillingen "Antal bogstaver per normalside" er tom'}
            </div>
          </>
        )}
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
          {settingsOpen && (
            <div>
              <div>
                <p>Antal bogstaver per normalside:</p>
                <input
                  onChange={(e) => {
                    setCharsPerPage(e.target.value);
                    localStorage.setItem('charsPerPage', e.target.value);
                  }}
                  type="number"
                  value={charsPerPage}
                  className="focus:border-gray-500 p-2 border rounded-md outline-none"
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setText('')}
            className="text-gray-50 focus:outline-none hover:bg-blue-600 focus:bg-blue-600 p-2 px-4 mt-3 bg-blue-700 rounded-md"
          >
            Nulstil
          </button>
        </div>
      </main>
      <footer className="mx-4 mt-1">
        <p>
          <Link
            href="https://github.com/Mikkel-T/normalsider"
            text="Open source"
          />{' '}
          projekt lavet af{' '}
          <Link href="https://mikkel-t.com" text="Mikkel Tønder" />
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Programmet beregner antal normalsider ved at dividere antal bogstaver
          og tal i teksten med {charsPerPage}.
          <br />
          Hvis du finder en fejl, må du meget gerne rapportere den{' '}
          <Link
            href="https://github.com/Mikkel-T/normalsider/issues/new"
            text="her"
          />
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
