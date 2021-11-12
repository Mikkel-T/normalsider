import {
  ChevronDownIcon,
  ChevronRightIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import Link from './Link';
import CharsToCount from './settings/CharsToCount';

function App() {
  const [text, setText] = useState<string>('');
  const [count, setCount] = useState<number>(0);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [charsPerPage, setCharsPerPage] = useState<number | string>(1300);
  const [charsToCount, setCharsToCount] = useState<Record<string, boolean>>({
    bogstaver: true,
    tal: true,
    mellemrum: false,
    andre: false,
  });

  useEffect(() => {
    const chars = localStorage.getItem('charsPerPage');
    if (chars) setCharsPerPage(+chars);
    const toCount = localStorage.getItem('charsToCount');
    if (toCount) setCharsToCount(JSON.parse(toCount));
  }, []);

  useEffect(() => {
    let n = 0;
    if (charsToCount.bogstaver) n += text.match(/[A-ZÀ-ÚÄ-Ü]/gi)?.length || 0;
    if (charsToCount.tal) n += text.match(/[0-9]/gi)?.length || 0;
    if (charsToCount.mellemrum) n += text.match(/[ ]/gi)?.length || 0;
    if (charsToCount.andre) n += text.match(/[^A-ZÀ-ÚÄ-Ü0-9 ]/gi)?.length || 0;
    setCount(n);
  }, [text, charsPerPage, charsToCount]);

  return (
    <div className={classNames('text-center')}>
      <main>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={classNames(
            'md:w-1/2 focus:outline-none h-60 sm:w-2/3 w-3/4 p-2 mt-5 mb-2 border border-black rounded-lg resize-y'
          )}
          aria-label="Tekst input"
        />
        {text && <div>Antal tegn: {text.length}</div>}
        {count > 0 && (
          <>
            <div>Antal talte tegn: {count}</div>
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
              className={classNames(
                'rounded-xl px-7 inline-block p-1 bg-gray-100'
              )}
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
        <div>
          <button
            onClick={() => setText('')}
            className={classNames(
              'text-gray-50 focus:outline-none hover:bg-blue-600 focus:bg-blue-600 p-2 px-4 mt-3 bg-blue-700 rounded-md'
            )}
          >
            Ryd tekstfelt
          </button>
        </div>
      </main>
      <footer className={classNames('mx-4 mt-1')}>
        <p>
          <Link
            href="https://github.com/Mikkel-T/normalsider"
            text="Open source"
          />{' '}
          projekt lavet af{' '}
          <Link href="https://mikkel-t.com" text="Mikkel Tønder" />
        </p>
        <p className={classNames('mb-4 text-sm text-gray-600')}>
          Programmet beregner antal normalsider ved at dividere antal tegn der
          tælles med i teksten (Kan sættes i indstillinger) med {charsPerPage}.
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
