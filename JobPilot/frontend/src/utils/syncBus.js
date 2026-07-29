const CHANNEL_NAME = "jobpilot-bewerbungen-sync";

const channel =
  typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel(CHANNEL_NAME)
    : null;

// Andere Tabs/Fenster (z.B. das Bookmarklet-Popup) über Änderungen informieren.
export function notifyBewerbungenChanged() {
  channel?.postMessage({ type: "changed", ts: Date.now() });
}

// Im Dashboard auf Änderungen aus anderen Tabs/Fenstern reagieren.
export function subscribeToBewerbungenChanges(callback) {
  if (!channel) return () => {};
  channel.addEventListener("message", callback);
  return () => channel.removeEventListener("message", callback);
}
