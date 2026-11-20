import { useRef, useState } from 'react';
import { ProductImage } from './components';

// Reduce las fotos de cámara antes de enviarlas para que no requieran edición manual.
export async function preparePhoto(file: File): Promise<string> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Elige una foto JPG, PNG o WebP. Si usas HEIC, expórtala como JPG.');
  if (file.size > 25000000) throw new Error('La foto supera los 25 MB. Elige una más pequeña.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image(); image.src = url; await image.decode();
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas'); canvas.width = Math.round(image.naturalWidth * scale); canvas.height = Math.round(image.naturalHeight * scale);
    const context = canvas.getContext('2d'); if (!context) throw new Error('No se pudo preparar la foto.');
    context.fillStyle = '#fff'; context.fillRect(0,0,canvas.width,canvas.height); context.drawImage(image,0,0,canvas.width,canvas.height);
    const result = canvas.toDataURL('image/jpeg', .85);
    if (result.length > 2600000) throw new Error('No se pudo reducir esta foto. Prueba con otra.');
    return result.split(',')[1];
  } finally { URL.revokeObjectURL(url); }
}
export default function ImageUpload({ image, busy, onFile, onRemove }: {image:string;busy:boolean;onFile:(file:File)=>void;onRemove:()=>void}) {
  const gallery = useRef<HTMLInputElement>(null); const camera = useRef<HTMLInputElement>(null);
  const [dragging,setDragging] = useState(false);
  const pick = (files: FileList | null) => { if(!busy && files?.[0]) onFile(files[0]); };
  return <section className="photo-field" aria-label="Foto del producto"><div className="photo-heading"><strong>Foto del producto</strong><span>La ajustamos automáticamente</span></div>
    <div className={`photo-drop ${dragging?'dragging':''}`} aria-busy={busy} onDragEnter={e=>{e.preventDefault();if(!busy)setDragging(true);}} onDragOver={e=>{e.preventDefault();e.dataTransfer.dropEffect=busy?'none':'copy';}} onDragLeave={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDragging(false);}} onDrop={e=>{e.preventDefault();setDragging(false);pick(e.dataTransfer.files);}}>
      {image ? <ProductImage src={image} alt="Foto seleccionada del producto"/> : <div className="photo-placeholder"><span aria-hidden="true">＋</span><h3>Una buena foto lo cambia todo</h3><p>Arrastra tu foto hasta aquí<br/>o elige cómo agregarla.</p></div>}
      <div className="photo-actions"><button type="button" className="button primary" disabled={busy} onClick={()=>gallery.current?.click()}>{image?'Cambiar foto':'Elegir una foto'}</button><button type="button" className="button secondary" disabled={busy} onClick={()=>camera.current?.click()}>Tomar foto</button></div>
      <p className="small muted" role="status">{busy?'Preparando y subiendo…':image?'Foto lista. Guarda el producto para publicar los cambios.':'JPG, PNG o WebP · desde tu celular o computadora'}</p>
      {image && <button type="button" className="remove-button" disabled={busy} onClick={onRemove}>Quitar foto</button>}
    </div>
    <input ref={gallery} className="sr-only" tabIndex={-1} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Elegir archivo de imagen" onChange={e=>{pick(e.target.files);e.target.value='';}}/>
    <input ref={camera} className="sr-only" tabIndex={-1} type="file" accept="image/*" capture="environment" aria-label="Tomar fotografía del producto" onChange={e=>{pick(e.target.files);e.target.value='';}}/>
  </section>;
}
