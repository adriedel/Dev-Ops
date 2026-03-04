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

export const STATUS_ICONS = {
  [STATUS.BEWORBEN]: "/paperplane-applied.svg",
  [STATUS.STUFE_WEITER]: "/arrow-step-further.svg",
  [STATUS.ANGENOMMEN]: "/check-circle-accepted.svg",
  [STATUS.ABGELEHNT]: "/cross-circle-denied.svg",
  [STATUS.KEINE_ANTWORT]: "/clock-no-answer.svg",
};

export const BEWERBUNGSARTEN = [
  "Initiativbewerbung",
  "Stellenausschreibung",
  "Empfehlung",
];
