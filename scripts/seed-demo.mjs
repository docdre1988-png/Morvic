// Añade las referencias de moda sin modificar ni eliminar productos existentes.
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {auth:{persistSession:false}});
const catalog = JSON.parse(readFileSync('public/catalog.json','utf8'));
const categoryIds = new Map();
for (const category of catalog.categories) {
  const {data,error} = await db.from('categories').select('id').eq('name',category.name);
  if(error) throw error;
  let id = data[0]?.id;
  if(!id) { const result = await db.from('categories').insert({name:category.name,subtitle:category.subtitle}).select('id').single(); if(result.error) throw result.error; id=result.data.id; }
  categoryIds.set(category.id,id);
}
for(const product of catalog.products) {
  const {data,error} = await db.from('products').select('id').eq('image',product.image).eq('demo',true);
  if(error) throw error;
  if(data.length) continue;
  const {id,...record}=product;
  const result=await db.from('products').insert({...record,categoryId:categoryIds.get(product.categoryId)});
  if(result.error) throw result.error;
  console.log('Referencia añadida: '+product.name);
}
console.log('Catálogo referencial listo; productos anteriores conservados.');
