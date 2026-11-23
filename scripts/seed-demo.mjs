// Importa el catálogo actual o el JSON indicado, sin modificar productos existentes.
// Ejecutar con Node 22: node --experimental-strip-types --env-file=.env scripts/seed-demo.mjs
import { readFileSync } from 'node:fs';
import { sameProduct } from '../src/product-match.ts';
import { createClient } from '@supabase/supabase-js';
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {auth:{persistSession:false}});
const catalog = JSON.parse(readFileSync('public/catalog.json','utf8'));
if (process.argv[2]) catalog.products = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const existing = await db.from('products').select('*');
if (existing.error) throw existing.error;
const categoryIds = new Map();
for (const category of catalog.categories) {
  const {data,error} = await db.from('categories').select('id').eq('name',category.name);
  if(error) throw error;
  let id = data[0]?.id;
  if(!id) { const result = await db.from('categories').insert({name:category.name,subtitle:category.subtitle}).select('id').single(); if(result.error) throw result.error; id=result.data.id; }
  categoryIds.set(category.id,id);
}
for(const product of catalog.products) {
  if(existing.data.some(item => sameProduct(item, product))) { console.log('Ya existe: '+product.name); continue; }
  const {id,...record}=product;
  const result=await db.from('products').insert({...record,categoryId:categoryIds.get(product.categoryId)});
  if(result.error) throw result.error;
  existing.data.push(product);
  console.log('Producto añadido: '+product.name);
}
console.log('Importación terminada; productos anteriores conservados.');
