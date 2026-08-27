// Scheduled downtime for the ReportCard portal.
// Closed daily 22:30–23:30 IST  ==  17:00–18:00 UTC.
// No cron job needed: every request is checked live against server time,
// so the site closes and reopens itself automatically.

const CLOSE_HOUR_UTC = 17; // 22:30 IST
const OPEN_HOUR_UTC = 18;  // 23:30 IST

export async function onRequest(context) {
  const { request, next } = context;

  const now = new Date();
  const hourUTC = now.getUTCHours();
  const isClosed = hourUTC >= CLOSE_HOUR_UTC && hourUTC < OPEN_HOUR_UTC;

  if (!isClosed) {
    return next();
  }

  return new Response(renderMaintenancePage(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "3600",
      "Cache-Control": "no-store",
    },
  });
}

function renderMaintenancePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Portal Temporarily Unavailable</title>
<style>
  :root {
    --bg-1: #0b1220;
    --bg-2: #131c31;
    --card: #161f36;
    --accent: #5b8cff;
    --accent-soft: rgba(91,140,255,0.18);
    --text: #eef1f8;
    --muted: #93a0bd;
  }
  * { box-sizing: border-box; }
  html, body {
    height: 100%;
    margin: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: radial-gradient(circle at 50% 0%, var(--bg-2), var(--bg-1) 70%);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
  }
  .card {
    background: var(--card);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 20px;
    padding: 48px 40px;
    max-width: 440px;
    width: 100%;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
    animation: rise 0.6s ease-out;
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .icon-wrap {
    width: 96px;
    height: 96px;
    margin: 0 auto 28px;
    position: relative;
  }
  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--accent-soft);
    animation: pulse 2.2s ease-out infinite;
  }
  @keyframes pulse {
    0%   { transform: scale(0.7); opacity: 0.9; }
    70%  { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  .gear {
    position: relative;
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gear svg {
    width: 52px;
    height: 52px;
    animation: spin 6s linear infinite;
    color: var(--accent);
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  h1 {
    font-size: 22px;
    margin: 0 0 10px;
    letter-spacing: -0.01em;
  }
  p {
    color: var(--muted);
    line-height: 1.55;
    margin: 0 0 6px;
    font-size: 15px;
  }
  .timebox {
    margin: 26px 0 22px;
    padding: 16px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .timebox .label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .countdown {
    font-size: 30px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
    color: var(--text);
  }
  .footnote {
    font-size: 12.5px;
    color: var(--muted);
    margin-top: 18px;
  }
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    margin: 0 2px;
    animation: blink 1.4s infinite ease-in-out;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }
</style>
</head>
<body>
  <div class="card">
    <div class="icon-wrap">
      <div class="ring"></div>
      <div class="gear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </div>
    </div>

    <h1>Portal Temporarily Unavailable</h1>
    <p>We're carrying out scheduled maintenance to keep the results portal running smoothly and securely.</p>

    <div class="timebox">
      <div class="label">Back online in</div>
      <div class="countdown" id="countdown">--:--</div>
    </div>

    <p class="footnote">
      This happens automatically every day, 10:30&nbsp;PM&ndash;11:30&nbsp;PM&nbsp;IST.<br/>
      No action needed &mdash; this page will refresh itself<span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </p>
  </div>

<script>
  // Reopen time is always the next 18:00 UTC (23:30 IST) boundary.
  function getReopenTime() {
    const now = new Date();
    const reopen = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 0, 0));
    if (reopen <= now) reopen.setUTCDate(reopen.getUTCDate() + 1);
    return reopen;
  }

  const reopenAt = getReopenTime();
  const el = document.getElementById('countdown');

  function tick() {
    const diff = reopenAt - new Date();
    if (diff <= 0) {
      el.textContent = 'Reopening…';
      window.location.reload();
      return;
    }
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
</script>
</body>
</html>`;
}
