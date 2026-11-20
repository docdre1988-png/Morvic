import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore servidor JavaScript compartido con Vercel
import { authenticated, token, cookie } from '../server/auth.mjs';
process.env.SESSION_SECRET = 'test-only-session-secret-with-32-characters';
test('sesión firmada válida, caducada y manipulada', () => {
  const value = token(1000);
  assert.equal(authenticated(cookie(value), 2000), true);
  assert.equal(authenticated(cookie(value), 1000 + 8 * 3600000), false);
  assert.equal(authenticated(cookie(value + 'bad'), 2000), false);
  assert.equal(authenticated(''), false);
  assert.match(cookie(value), /HttpOnly; SameSite=Strict/);
});
