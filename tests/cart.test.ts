import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCart, subtotal, whatsappLink } from '../src/cart.ts';
const products = [{ id: '1', name: 'Polo & Sol', categoryId: 'ninos', price: 19.9, description: '', image: '', color: 'Miel', sizes: ['2 años', '4 años'], available: true, visible: true, demo: true }];
test('descarta datos corruptos, productos ocultos, agotados y tallas inexistentes', () => {
  assert.deepEqual(normalizeCart([null, { productId: '1', size: '9', quantity: 1 }, { productId: '1', size: '2 años', quantity: -1 }, { productId: '1', size: '2 años', quantity: 1.5 }], products), []);
  assert.deepEqual(normalizeCart([{ productId: '1', size: '2 años', quantity: 1 }], [{ ...products[0], available: false }]), []);
  assert.deepEqual(normalizeCart([{ productId: '1', size: '2 años', quantity: 1 }], [{ ...products[0], visible: false }]), []);
  assert.deepEqual(normalizeCart({ bad: true }, products), []);
});
test('combina la misma talla, conserva tallas distintas y limita a 20 unidades', () => {
  assert.deepEqual(normalizeCart([{ productId: '1', size: '2 años', quantity: 19 }, { productId: '1', size: '2 años', quantity: 5 }, { productId: '1', size: '4 años', quantity: 2 }], products), [{ productId: '1', size: '2 años', quantity: 20 }, { productId: '1', size: '4 años', quantity: 2 }]);
});
test('calcula en céntimos y codifica productos, talla, color, cantidad y total', () => {
  const cart = [{ productId: '1', size: '2 años', quantity: 3 }];
  assert.equal(subtotal(cart, products), 59.7);
  const url = new URL(whatsappLink('51907279299', 'Nido Mini', cart, products, true));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/51907279299');
  const message = url.searchParams.get('text')!;
  assert.match(message, /PRUEBA DE CATÁLOGO/);
  assert.match(message, /Polo & Sol · Miel · 2 años × 3/);
  assert.match(message, /59.70/);
  assert.match(message, /confirmar disponibilidad/);
});
test('no genera pedidos vacíos ni teléfonos inválidos', () => {
  assert.equal(whatsappLink('51907279299', 'Nido Mini', [], products), '');
  assert.equal(whatsappLink('invalid', 'Nido Mini', [{ productId: '1', size: '2 años', quantity: 1 }], products), '');
});
