import type { Metadata } from 'next';
import DigitalEntrance from '@/components/entrance/DigitalEntrance';

// Keep the animated intro out of search results so searches land on /about.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Home() {
  return <DigitalEntrance />;
}
