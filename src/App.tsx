import React, { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const arr = text.match(/[a-zA-ZÆæØøÅå0-9]/g);
    setCount(arr ? arr.length : 0);
  }, [text]);

  return (
    <div className={`text-center`}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={`border-black border-[1px] mt-5 resize-y rounded-lg md:w-1/2 p-2 focus:outline-none h-60 sm:w-2/3 w-3/4`}
        aria-label="Tekst input"
      />
      {count > 0 && (
        <div className={`mt-3`}>
          <div>Antal tegn: {text.length}</div>
          <div>Antal bogstaver: {count}</div>
          <div>Normalsider: {count / 1300}</div>
        </div>
      )}
      <div>
        <button
          onClick={() => setText('')}
          className={`p-2 px-4 text-gray-50 bg-blue-700 rounded-md focus:outline-none hover:bg-blue-600 mt-3`}
        >
          Nulstil
        </button>
      </div>
      <div className={`mt-1`}>
        Normalsider bliver beregnet ved at dividere antal bogstaver og tal i
        teksten med 1300
      </div>
    </div>
  );
}

export default App;
