import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
export function equal(a, b) { const x = createHmac('sha256', 'compare').update(String(a)).digest(); const y = createHmac('sha256', 'compare').update(String(b)).digest(); return timingSafeEqual(x, y); }
export function sessionConfigured() { return Boolean(process.env.SESSION_SECRET?.length >= 32 || process.env.SUPABASE_SERVICE_ROLE_KEY); }
function secret() {
  if (process.env.SESSION_SECRET?.length >= 32) return process.env.SESSION_SECRET;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Conecta Supabase para habilitar el acceso.');
  return createHmac('sha256', process.env.SUPABASE_SERVICE_ROLE_KEY).update(JSON.stringify(['catalogo-admin-session-v1', process.env.ADMIN_USER, process.env.ADMIN_PASSWORD])).digest('hex');
}
export function sameOrigin(req) {
  try {
    const origin = new URL(req.headers.origin);
    return origin.host === req.headers.host && origin.origin === req.headers.origin && origin.protocol === (process.env.NODE_ENV === 'production' ? 'https:' : 'http:');
  } catch { return false; }
}
export function token(now = Date.now()) { const payload = Buffer.from(JSON.stringify({ exp: now + 8 * 3600000, nonce: randomBytes(16).toString('hex') })).toString('base64url'); return `${payload}.${createHmac('sha256', secret()).update(payload).digest('base64url')}`; }
export function authenticated(cookie = '', now = Date.now()) { try { const value = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('nido_session='))?.slice(13); if (!value) return false; const [payload, signature] = value.split('.'); if (!equal(signature, createHmac('sha256', secret()).update(payload).digest('base64url'))) return false; return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > now; } catch { return false; } }
export function cookie(value, clear = false) { return `nido_session=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${clear ? 0 : 28800}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`; }
