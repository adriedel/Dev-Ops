export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const STATUS = {
  IN_PLANUNG: "in_planung",
  BEWORBEN: "beworben",
  STUFE_WEITER: "stufe_weiter",
  ANGENOMMEN: "angenommen",
  ABGELEHNT: "abgelehnt",
  KEINE_ANTWORT: "keine_antwort",
  GESAMT: "gesamt",
};

export const STATUS_LABELS = {
  [STATUS.IN_PLANUNG]: "In Planung",
  [STATUS.BEWORBEN]: "Beworben",
  [STATUS.STUFE_WEITER]: "Stufe weiter",
  [STATUS.ANGENOMMEN]: "Angenommen",
  [STATUS.ABGELEHNT]: "Abgelehnt",
  [STATUS.KEINE_ANTWORT]: "Keine Antwort",
  [STATUS.GESAMT]: "Gesamt",
};

export const STATUS_ICONS = {
  [STATUS.IN_PLANUNG]: "/plan.svg",
  [STATUS.BEWORBEN]: "/paperplane-applied.svg",
  [STATUS.STUFE_WEITER]: "/arrow-step-further.svg",
  [STATUS.ANGENOMMEN]: "/check-circle-accepted.svg",
  [STATUS.ABGELEHNT]: "/cross-circle-denied.svg",
  [STATUS.KEINE_ANTWORT]: "/clock-no-answer.svg",
  [STATUS.GESAMT]: "/trending.svg",
};

export const BEWERBUNGSARTEN = [
  "Initiativbewerbung",
  "Stellenausschreibung",
  "Empfehlung",
];
