import React from 'react';

export default function Link({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="hover:underline text-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
