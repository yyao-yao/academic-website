import type { PhotographyData } from '@/types/photography';
import PhotoGallery from './PhotoGallery';
import PhotographyHeading from './PhotographyHeading';
import styles from './photography.module.css';

export default function PhotographyPage({ gallery }: { gallery: PhotographyData }) {
  return (
    <div className={styles.page} data-photography>
      <header className={styles.heading}>
        <PhotographyHeading gallery={gallery} />
        {gallery.photos.some(photo => photo.sample) && <p className={styles.sampleNotice}>Placeholder collection for layout review. These photographs belong to the credited photographers, not the site owner.</p>}
      </header>
      <PhotoGallery photos={gallery.photos} />
    </div>
  );
}
