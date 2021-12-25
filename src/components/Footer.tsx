import React from 'react';

import Link from './Link';

export default function Footer({
  charsPerPage,
}: {
  charsPerPage: string | number;
}) {
  return (
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
  );
}
