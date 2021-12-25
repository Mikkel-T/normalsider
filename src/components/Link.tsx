import React from 'react';

export default function Link({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
}
