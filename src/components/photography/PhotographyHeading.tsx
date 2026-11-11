'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import type { PhotographyData } from '@/types/photography';
import styles from './photography.module.css';

export default function PhotographyHeading({ gallery }: { gallery: PhotographyData }) {
  const zh = useLocaleStore(state => state.locale).startsWith('zh');
  const title = zh ? gallery.title_zh || gallery.title : gallery.title;
  const description = zh ? gallery.description_zh || gallery.description : gallery.description;
  return <>
    <h1>{title}</h1>
    {description && <p className={styles.subtitle}>{description}</p>}
  </>;
}
