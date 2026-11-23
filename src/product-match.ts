import type { Product } from './types.ts';

type Identity = Pick<Product, 'name' | 'color' | 'description' | 'image'>;
const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ').toLowerCase();
const sku = (product: Identity) => product.description.match(/SKU:\s*([A-Z0-9-]+)/i)?.[1].toUpperCase();

export function sameProduct(a: Identity, b: Identity): boolean {
  const aSku = sku(a), bSku = sku(b);
  if (aSku && bSku) return aSku === bSku;
  return Boolean(a.image && b.image && a.image === b.image) ||
    (normalized(a.name) === normalized(b.name) && normalized(a.color) === normalized(b.color));
}
