import { hasOfficialCv } from '@/lib/cv';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import DigitalEntrance from '@/components/entrance/DigitalEntrance';

export default function Home() {
  const i18n = getRuntimeI18nConfig(getConfig().i18n);
  return <DigitalEntrance cvAvailable={hasOfficialCv()} i18n={i18n} />;
}
