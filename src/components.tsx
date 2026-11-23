import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function Icon({ name, size = 22 }: { name: 'bag' | 'search' | 'menu' | 'close' | 'heart' | 'chat' | 'sun' | 'leaf'; size?: number }) {
  const paths = {
    bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    heart: <path d="M20.5 4.5a5 5 0 0 0-7 0L12 6l-1.5-1.5a5 5 0 0 0-7 7L12 20l8.5-8.5a5 5 0 0 0 0-7Z"/>,
    chat: <><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
    leaf: <><path d="M20 3C4 2 2 12 7 17s15 3 13-14Z"/><path d="m4 21 12-12"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
export function ProductImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src || '/images/placeholder.svg'} alt={alt} className={className} loading="lazy" decoding="async" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.svg'; }} />;
}
export function Dialog({ title, onClose, children, drawer = false }: { title: string; onClose: () => void; children: ReactNode; drawer?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    element.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={drawer ? 'dialog drawer' : 'dialog'} aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    <div className="dialog-header"><span className="eyebrow">{title}</span><button className="icon-button" onClick={onClose} aria-label="Cerrar"><Icon name="close" /></button></div>{children}
  </dialog>;
}
