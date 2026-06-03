import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../assets/icons/back.svg?react";
import "./BookmarkletInstall.css";

function buildBookmarkletCode(origin) {
  const base = `${origin}/quick-add`;
  return (
    `(function(){` +
    `var b='${base}',` +
    `l=encodeURIComponent(location.href),` +
    `t=encodeURIComponent(document.title),` +
    `f='',` +
    `og=document.querySelector('meta[property="og:site_name"]');` +
    `if(og)f=og.content;` +
    `if(!f){` +
    `var map={` +
    `'linkedin.com':'.job-details-jobs-unified-top-card__company-name a,.topcard__org-name-link',` +
    `'indeed.com':'[data-testid="inlineHeader-companyName"] a',` +
    `'stepstone.de':'[data-at="job-header-company-name"]',` +
    `'xing.com':'[data-testid="job-detail-company-name"]',` +
    `'arbeitsagentur.de':'.jobdetails-header__company'` +
    `};` +
    `for(var k in map){` +
    `if(location.hostname.includes(k)){` +
    `var el=document.querySelector(map[k]);` +
    `if(el){f=el.textContent.trim();break;}` +
    `}}}` +
    `window.open(b+'?link='+l+'&position='+t+'&firma='+encodeURIComponent(f),` +
    `'JobPilot','width=460,height=700,left=200,top=80,resizable=yes,scrollbars=yes');` +
    `})()`
  );
}

const STEPS = [
  {
    num: "1",
    title: "Lesezeichen-Leiste einblenden",
    text: "Falls sie noch nicht sichtbar ist: Strg+Shift+B (Windows) bzw. Cmd+Shift+B (Mac).",
  },
  {
    num: "2",
    title: "Button in die Leiste ziehen",
    text: 'Ziehe den "Job merken"-Button unten per Drag & Drop in deine Lesezeichen-Leiste.',
  },
  {
    num: "3",
    title: "Auf einer Stellenanzeige nutzen",
    text: 'Öffne eine Stelle auf LinkedIn, Indeed, Stepstone o.ä. und klicke "Job merken" — ein Fenster öffnet sich mit den vorausgefüllten Daten.',
  },
];

const SUPPORTED_SITES = [
  { name: "LinkedIn", url: "linkedin.com" },
  { name: "Indeed", url: "indeed.com" },
  { name: "Stepstone", url: "stepstone.de" },
  { name: "XING", url: "xing.com" },
  { name: "Arbeitsagentur", url: "arbeitsagentur.de" },
  { name: "Alle anderen", url: null },
];

function BookmarkletInstall() {
  const navigate = useNavigate();
  const linkRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (linkRef.current) {
      const code = buildBookmarkletCode(window.location.origin);
      linkRef.current.setAttribute("href", "javascript:" + code);
    }
  }, []);

  const handleCopy = () => {
    if (!linkRef.current) return;
    const href = linkRef.current.getAttribute("href");
    navigator.clipboard.writeText(href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bm-page">
      <button className="bm-back" onClick={() => navigate(-1)} title="Zurück">
        <ArrowLeftIcon className="bm-back-icon" aria-hidden="true" />
      </button>

      <div className="bm-content">
        <div className="bm-hero">
          <img src="/Logo-JobPilot.svg" alt="JobPilot" className="bm-logo" />
          <div>
            <h1 className="bm-heading">Bookmarklet installieren</h1>
            <p className="bm-lead">
              Speichere Stellenanzeigen mit einem Klick direkt in deinen JobPilot-Tracker —
              von jeder Website aus.
            </p>
          </div>
        </div>

        {/* Draggable bookmarklet */}
        <div className="bm-drag-section">
          <p className="bm-drag-label">Diesen Button in deine Lesezeichen-Leiste ziehen:</p>
          <div className="bm-drag-row">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              ref={linkRef}
              href="#"
              className="bm-bookmarklet-btn"
              draggable="true"
              onClick={(e) => e.preventDefault()}
              title="In Lesezeichen-Leiste ziehen"
            >
              📌 Job merken
            </a>
            <button className="bm-copy-btn" onClick={handleCopy} title="Code kopieren">
              {copied ? "✓ Kopiert" : "Code kopieren"}
            </button>
          </div>
          <p className="bm-drag-hint">
            Tipp: Den Button einfach per Drag &amp; Drop in die Lesezeichen-Leiste ziehen.
          </p>
        </div>

        {/* Steps */}
        <div className="bm-steps">
          <h2 className="bm-section-title">So geht's</h2>
          <div className="bm-step-list">
            {STEPS.map((step) => (
              <div key={step.num} className="bm-step">
                <div className="bm-step-num">{step.num}</div>
                <div className="bm-step-body">
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported sites */}
        <div className="bm-sites">
          <h2 className="bm-section-title">Automatische Firmenerkennung</h2>
          <p className="bm-sites-text">
            Auf diesen Seiten wird die Firma automatisch aus der Seite ausgelesen:
          </p>
          <div className="bm-site-list">
            {SUPPORTED_SITES.map((site) => (
              <div key={site.name} className="bm-site-chip">
                {site.url ? (
                  <>
                    <span className="bm-site-dot bm-site-dot--auto" />
                    {site.name}
                  </>
                ) : (
                  <>
                    <span className="bm-site-dot bm-site-dot--manual" />
                    {site.name} — URL + Titel werden übernommen
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="bm-info">
          <strong>Wie funktioniert das?</strong>
          <p>
            Ein Bookmarklet ist ein Lesezeichen mit JavaScript-Code statt einer URL.
            Beim Klick öffnet es ein kleines JobPilot-Fenster mit den vorausgefüllten Stellendaten —
            du überprüfst kurz, ergänzt Notizen und klickst auf Speichern.
            Kein Plugin, kein Store, läuft in jedem Browser.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookmarkletInstall;