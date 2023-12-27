import { emptyRules } from "./rules";

let _text = $state("");

export const text = {
  get text() {
    return _text;
  },
  set text(value) {
    _text = value;
  },
};

let _rules = $state(emptyRules());

export const rules = {
  get rules() {
    return _rules;
  },
  set rules(value) {
    _rules = value;
  },
};
