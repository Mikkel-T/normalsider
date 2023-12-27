export interface Rules {
  letters: boolean;
  numbers: boolean;
  spaces: boolean;
  symbols: boolean;
  length: number;
}

export interface RuleDefault {
  name: string;
  rules: Rules;
}

export const ruleDefaults: RuleDefault[] = [
  {
    name: "Folkeskole",
    rules: {
      letters: true,
      numbers: true,
      spaces: false,
      symbols: false,
      length: 1300,
    },
  },
  {
    name: "Gymnasium",
    rules: {
      letters: true,
      numbers: true,
      spaces: true,
      symbols: true,
      length: 2400,
    },
  },
];

export function emptyRules(): Rules {
  return {
    letters: false,
    numbers: false,
    spaces: false,
    symbols: false,
    length: 0,
  };
}

export function isEmptyRules(rules: Rules): boolean {
  return (
    (!rules.letters || !rules.numbers || !rules.spaces || !rules.symbols) &&
    rules.length === 0
  );
}

export function countLetters(text: string): number {
  return text.match(/[A-ZÀ-ÚÄ-Ü]/gi)?.length || 0;
}

export function countNumbers(text: string): number {
  return text.match(/[0-9]/g)?.length || 0;
}

export function countSpaces(text: string): number {
  return text.match(/\s/g)?.length || 0;
}

export function countSymbols(text: string): number {
  return text.match(/[^A-ZÀ-ÚÄ-Ü0-9\s]/gi)?.length || 0;
}

export function countText(text: string, rules: Rules): number {
  let count = 0;
  if (rules.letters) count += countLetters(text);
  if (rules.numbers) count += countNumbers(text);
  if (rules.spaces) count += countSpaces(text);
  if (rules.symbols) count += countSymbols(text);
  return count;
}

export function textPages(text: string, rules: Rules): number {
  return countText(text, rules) / rules.length;
}

export function prettyPrintRules(rules: Rules): string {
  let r = [];
  if (rules.letters) r.push("bogstaver");
  if (rules.numbers) r.push("tal");
  if (rules.spaces) r.push("mellemrum");
  if (rules.symbols) r.push("symboler");

  let str = "";

  r.forEach((rule, i) => {
    if (i === 0) str += rule;
    else if (i === r.length - 1) str += ` og ${rule}`;
    else str += `, ${rule}`;
  });

  return `${rules.length} ${str}`;
}
