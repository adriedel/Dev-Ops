export const API_URL = "http://localhost:3001/api";

export const STATUS = {
  BEWORBEN: "beworben",
  STUFE_WEITER: "stufe_weiter",
  ANGENOMMEN: "angenommen",
  ABGELEHNT: "abgelehnt",
  KEINE_ANTWORT: "keine_antwort",
};

export const STATUS_LABELS = {
  [STATUS.BEWORBEN]: "Beworben",
  [STATUS.STUFE_WEITER]: "Stufe weiter",
  [STATUS.ANGENOMMEN]: "Angenommen",
  [STATUS.ABGELEHNT]: "Abgelehnt",
  [STATUS.KEINE_ANTWORT]: "Keine Antwort",
};

/*export const STATUS_ICONS = {
  [STATUS.BEWORBEN]: '✈️',
  [STATUS.STUFE_WEITER]: '➡️',
  [STATUS.ANGENOMMEN]: '✅',
  [STATUS.ABGELEHNT]: '❌',
  [STATUS.KEINE_ANTWORT]: '🕐'
};
*/

export const BEWERBUNGSARTEN = [
  "Initiativbewerbung",
  "Stellenausschreibung",
  "Empfehlung",
];
