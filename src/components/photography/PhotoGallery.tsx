'use client';

import { useCallback, useRef, useState } from 'react';
import PhotoLightbox from './PhotoLightbox';
import type { Photograph } from '@/types/photography';
import styles from './photography.module.css';

function Photo({ photo, opening = false, onOpen }: { photo: Photograph; opening?: boolean; onOpen: (id: string, trigger: HTMLButtonElement) => void }) {
  const jpeg = photo.assets.jpeg;
  const largest = jpeg[jpeg.length - 1];
  const orientation = photo.height > photo.width ? 'portrait' : 'landscape';
  const sizes = `(max-width: 640px) calc(100vw - 48px), (max-width: 1023px) ${opening ? '90vw' : '48vw'}, ${opening ? '940px' : '580px'}`;
  const metadata = [photo.location, photo.date, photo.camera].filter(Boolean).join(' · ');
  return (
    <figure className={styles.photograph} data-photo-id={photo.id} data-orientation={orientation}>
      <button type="button" className={styles.photoButton} aria-label={`View ${photo.title || photo.alt}`} aria-haspopup="dialog" onClick={event => onOpen(photo.id, event.currentTarget)}>
        <picture className={styles.picture}>
          <source type="image/webp" srcSet={photo.assets.webp.map(asset => `${asset.src} ${asset.width}w`).join(', ')} sizes={sizes} />
          {/* Native srcsets are deliberate: all variants are prepared for static export. */}
          <img
            src={largest.src}
            srcSet={jpeg.map(asset => `${asset.src} ${asset.width}w`).join(', ')}
            sizes={sizes}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading={opening ? 'eager' : 'lazy'}
            fetchPriority={opening ? 'high' : undefined}
            decoding="async"
            draggable={false}
          />
        </picture>
      </button>
      {(photo.title || photo.description || metadata || photo.credit) && (
        <figcaption className={styles.caption}>
          {photo.title && <p className={styles.photoTitle}>{photo.title}</p>}
          {photo.description && <p className={styles.photoDescription}>{photo.description}</p>}
          {metadata && <p className={styles.metadata}>{metadata}</p>}
          {photo.credit && <p className={styles.credit}>{photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Photo by {photo.credit}{photo.sourceUrl.startsWith('https://unsplash.com/') ? ' / Unsplash' : ''}</a> : `Photo by ${photo.credit}`}</p>}
        </figcaption>
      )}
    </figure>
  );
}

export default function PhotoGallery({ photos }: { photos: Photograph[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const open = (id: string, trigger: HTMLButtonElement) => {
    const index = photos.findIndex(photo => photo.id === id);
    if (index < 0) return;
    opener.current = trigger;
    setActiveIndex(index);
  };
  if (photos.length === 0) return null;
  // Editorial rows, keeping the given order. Featured photos are shown larger
  // with one small companion; landscapes pair with a portrait; the rest run three to a row.
  type Kind = 'ppp' | 'pp' | 'p' | 'lp' | 'pl' | 'l' | 'fl' | 'fr' | 'L';
  type Row = { kind: Kind; photos: Photograph[] };
  const isLandscape = (photo: Photograph) => photo.width > photo.height;
  const isPlain = (photo?: Photograph) => !!photo && !photo.featured && !isLandscape(photo);
  const runKind = (count: number): Kind => (count === 3 ? 'ppp' : count === 2 ? 'pp' : 'p');
  const rows: Row[] = [];
  let landscapeLeft = true;
  let featureLeft = true;
  for (let i = 0; i < photos.length;) {
    const current = photos[i];
    const next = photos[i + 1];
    if (current.featured && isLandscape(current)) { rows.push({ kind: 'L', photos: [current] }); i += 1; continue; }
    if (current.featured) {
      if (isPlain(next)) {
        rows.push({ kind: featureLeft ? 'fl' : 'fr', photos: featureLeft ? [current, next!] : [next!, current] });
        featureLeft = !featureLeft; i += 2;
      } else { rows.push({ kind: featureLeft ? 'fl' : 'fr', photos: [current] }); featureLeft = !featureLeft; i += 1; }
      continue;
    }
    if (isLandscape(current)) {
      if (isPlain(next)) {
        rows.push({ kind: landscapeLeft ? 'lp' : 'pl', photos: landscapeLeft ? [current, next!] : [next!, current] });
        landscapeLeft = !landscapeLeft; i += 2;
      } else { rows.push({ kind: 'l', photos: [current] }); i += 1; }
      continue;
    }
    const run: Photograph[] = [];
    while (run.length < 3 && isPlain(photos[i + run.length])) run.push(photos[i + run.length]);
    const after = photos[i + run.length];
    if (run.length < 3 && after && after.featured && !isLandscape(after)) {
      // A short run before a featured photo: its last photo becomes the companion.
      if (run.length > 1) rows.push({ kind: runKind(run.length - 1), photos: run.slice(0, -1) });
      rows.push({ kind: 'fr', photos: [run[run.length - 1], after] });
      featureLeft = true; i += run.length + 1; continue;
    }
    if (run.length < 3 && after && isLandscape(after) && !after.featured) {
      if (run.length > 1) rows.push({ kind: runKind(run.length - 1), photos: run.slice(0, -1) });
      const partner = run[run.length - 1];
      rows.push({ kind: landscapeLeft ? 'lp' : 'pl', photos: landscapeLeft ? [after, partner] : [partner, after] });
      landscapeLeft = !landscapeLeft; i += run.length + 1; continue;
    }
    rows.push({ kind: runKind(run.length), photos: run });
    i += run.length;
  }
  return (
    <>
      <div className={styles.rows}>
        {rows.map(row => (
          <div key={row.photos[0].id} className={styles.row} data-kind={row.kind}>
            {row.photos.map(photo => <Photo key={photo.id} photo={photo} opening={photo.id === photos[0].id} onOpen={open} />)}
          </div>
        ))}
      </div>
      {activeIndex !== null && photos[activeIndex] && (
        <PhotoLightbox photos={photos} index={activeIndex} onIndexChange={setActiveIndex} onClose={close} opener={opener.current} />
      )}
    </>
  );
}
