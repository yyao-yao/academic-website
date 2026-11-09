import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = 'https://yyao-yao.github.io';

// The animated home page is left out on purpose so searches land on /about/.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/about/`, priority: 1 },
    { url: `${SITE}/publications/`, priority: 0.8 },
    { url: `${SITE}/teaching/`, priority: 0.6 },
    { url: `${SITE}/cv/`, priority: 0.6 },
    { url: `${SITE}/photography/`, priority: 0.3 },
  ];
}
