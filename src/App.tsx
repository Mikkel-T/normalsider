import Footer from '@components/Footer';
import Settings from '@components/Settings';
import React, { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState<string>('');
  const [count, setCount] = useState<number>(0);

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
    <div className="text-center">
      <main>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="p-2 mt-5 mb-2 w-3/4 h-60 rounded-lg border border-black resize-y sm:w-2/3 md:w-1/2 focus:outline-none"
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
        <Settings
          charsPerPage={charsPerPage}
          charsToCount={charsToCount}
          setCharsPerPage={setCharsPerPage}
          setCharsToCount={setCharsToCount}
        />
        <div>
          <button
            onClick={() => setText('')}
            className="p-2 px-4 mt-3 text-gray-50 bg-blue-700 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Ryd tekstfelt
          </button>
        </div>
      </main>
      <Footer charsPerPage={charsPerPage} />
    </div>
  );
}

export default App;
