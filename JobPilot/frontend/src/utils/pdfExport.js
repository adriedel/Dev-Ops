import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { STATUS_LABELS } from "./constants";

function formatDate(value, locale) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(locale === "en" ? "en-GB" : "de-DE");
}

export function exportBewerbungenToPdf(
  bewerbungen,
  { locale = "de", t, userName } = {},
) {
  const doc = new jsPDF({ orientation: "landscape" });
  const title = userName
    ? t
      ? t("header.pdfTitle", { name: userName })
      : locale === "en"
        ? `Application Tracker, Applications from ${userName}`
        : `Bewerbungstracker, Bewerbungen von ${userName}`
    : t
      ? t("header.title")
      : locale === "en"
        ? "Application Tracker"
        : "Bewerbungstracker";

  doc.setFontSize(16);
  doc.text(title, 14, 16);

  doc.setFontSize(10);
  doc.setTextColor(120);
  const generatedLabel = locale === "en" ? "Generated on" : "Erstellt am";
  doc.text(
    `${generatedLabel}: ${formatDate(new Date().toISOString(), locale)}`,
    14,
    22,
  );

  const head = [
    [
      t ? t("modal.position") : "Position",
      t ? t("modal.company") : "Firma",
      t ? t("modal.location") : "Standort",
      t ? t("modal.status") : "Status",
      t ? t("modal.date") : "Bewerbungsdatum",
    ],
  ];

  const body = bewerbungen.map((b) => [
    b.position || "-",
    b.firma || "-",
    b.standort || "-",
    (t ? t(`status.${b.status}`) : STATUS_LABELS[b.status]) || b.status || "-",
    formatDate(b.datum, locale),
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 28,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [30, 58, 138], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });

  const dateStr = new Date().toISOString().split("T")[0];
  doc.save(`Bewerbungen_${dateStr}.pdf`);
}
