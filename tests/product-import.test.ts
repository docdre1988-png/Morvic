import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sameProduct } from '../src/product-match.ts';

const records = JSON.parse(readFileSync(new URL('../docs/importaciones/morvic-9-productos.json', import.meta.url), 'utf8'));

test('nueve fichas distintas sin fotos, inventario ni precios inventados', () => {
  assert.equal(records.length, 9);
  for (const p of records) {
    assert.equal(p.categoryId, 'calzado');
    assert.equal(p.price, 0);
    assert.equal(p.image, '');
    assert.deepEqual(p.sizes, []);
    assert.equal(p.available, false);
    assert.equal(p.visible, true);
    assert.match(p.description, /Marca: .*Modelo: .*SKU:/);
    assert.ok(p.description.length <= 4000);
  }
  for (let i = 0; i < records.length; i++) {
    assert.equal(sameProduct(records[i], { ...records[i], image: 'https://example.com/uploaded.jpg' }), true);
    for (let j = i + 1; j < records.length; j++) assert.equal(sameProduct(records[i], records[j]), false);
  }
});

test('no confunde imágenes vacías, variantes de color ni SKU distintos', () => {
  const p = { name: 'Nike V5 RNR', color: 'Blanco', description: '', image: '' };
  assert.equal(sameProduct(p, { ...p, name: 'Adidas Response' }), false);
  assert.equal(sameProduct(p, { ...p, color: 'Gris' }), false);
  assert.equal(sameProduct(p, { ...p, name: ' NIKE V5 RNR ' }), true);
  assert.equal(sameProduct({ ...p, description: 'SKU: HJ5228-101.' }, { ...p, description: 'SKU: HJ5228-014.' }), false);
});
