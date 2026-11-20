import type { CartItem, Product } from './types.ts';
export const MAX_QUANTITY = 20;
export const money = (value: number) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
export const lineKey = (item: Pick<CartItem, 'productId' | 'size'>) => JSON.stringify([item.productId, item.size]);
export function normalizeCart(raw: unknown, products: Product[]): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const result = new Map<string, CartItem>();
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const p = products.find(p => p.id === item.productId && p.available && p.visible);
    if (!p || typeof item.size !== 'string' || !p.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    const key = lineKey(item);
    result.set(key, { productId: p.id, size: item.size, quantity: Math.min(MAX_QUANTITY, (result.get(key)?.quantity ?? 0) + item.quantity) });
  }
  return [...result.values()];
}
export function subtotal(cart: CartItem[], products: Product[]) {
  return cart.reduce((sum, item) => sum + Math.round((products.find(p => p.id === item.productId)?.price ?? 0) * 100) * item.quantity, 0) / 100;
}
export function whatsappLink(phone: string, name: string, cart: CartItem[], products: Product[], demo = false) {
  const valid = normalizeCart(cart, products);
  if (!valid.length || !/^\d{8,15}$/.test(phone)) return '';
  const lines = valid.map(item => {
    const p = products.find(p => p.id === item.productId)!;
    return `• ${p.name} · ${p.color} · ${item.size} × ${item.quantity} — ${money(p.price * item.quantity)}`;
  });
  const text = [demo ? 'PRUEBA DE CATÁLOGO — productos y precios de demostración.' : '', `¡Hola, ${name}! Me gustaría consultar este pedido:`, '', ...lines, '', `Total de productos: ${money(subtotal(valid, products))}`, 'Por favor, confirmar disponibilidad y costo de entrega.'].filter((line, i) => i !== 0 || line).join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
