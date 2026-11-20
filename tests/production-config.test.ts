import { test } from 'node:test';
import assert from 'node:assert/strict';
// @ts-ignore módulo de servidor JavaScript
import { token, authenticated, sameOrigin } from '../server/auth.mjs';
test('configuración automática firma sesiones y las invalida al cambiar la contraseña', () => {
  delete process.env.SESSION_SECRET;
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only-high-entropy-server-key';
  process.env.ADMIN_PASSWORD = 'test-password';
  const value = token();
  assert.equal(authenticated('nido_session='+value), true);
  process.env.ADMIN_PASSWORD = 'changed-password';
  assert.equal(authenticated('nido_session='+value), false);
});
test('acepta el dominio actual en HTTPS y bloquea sitios externos y origen ausente', () => {
  process.env.NODE_ENV = 'production';
  assert.equal(sameOrigin({headers:{host:'tienda.vercel.app',origin:'https://tienda.vercel.app'}}),true);
  assert.equal(sameOrigin({headers:{host:'tienda.vercel.app',origin:'https://otro.com'}}),false);
  assert.equal(sameOrigin({headers:{host:'tienda.vercel.app',origin:'http://tienda.vercel.app'}}),false);
  assert.equal(sameOrigin({headers:{host:'tienda.vercel.app'}}),false);
});
