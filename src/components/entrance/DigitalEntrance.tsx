'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import NavigationLink from '@/components/ui/NavigationLink';
import { getPrimaryNavigation } from '@/lib/navigation';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useThemeStore } from '@/lib/stores/themeStore';
import ParticleTitle from './ParticleTitle';
import { animateSignals } from './animateSignals';
import styles from './entrance.module.css';

export default function DigitalEntrance({ cvAvailable }: { cvAvailable: boolean }) {
  const locale = useLocaleStore(state => state.locale);
  const { theme, setTheme } = useThemeStore();
  const zh = locale.startsWith('zh');
  const portal = useRef<HTMLElement>(null);
  const signals = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (signals.current) return animateSignals(signals.current);
  }, []);

  return (
    <section ref={portal} className={styles.portal} aria-labelledby="portal-title">
      <div ref={signals} className={styles.signals} aria-hidden="true">
        <span className={styles.signal} data-signal data-glint><svg viewBox="0 0 16 16"><path d="M8 1.5 9.5 6.5 14.5 8 9.5 9.5 8 14.5 6.5 9.5 1.5 8 6.5 6.5Z" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="m8 2 4.5 6L8 14 3.5 8Z" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="m8 3 5.5 10h-11Z" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="M8 8C1-1 15-1 8 8c9-7 9 7 0 0 7 9-7 9 0 0-9 7-9-7 0 0Z" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="M8 2v12M2.8 5l10.4 6M2.8 11l10.4-6" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="M8 13 2.8 7.8C-.5 4.5 4 .5 8 4c4-3.5 8.5.5 5.2 3.8Z" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="m8 2 4 6-4 6-4-6Z" /></svg></span>
        <span className={styles.signal} data-signal data-glint><svg viewBox="0 0 16 16"><path d="m7 2 1.2 4.8L13 8l-4.8 1.2L7 14 5.8 9.2 1 8l4.8-1.2ZM13 1v3m-1.5-1.5h3" /></svg></span>
        <span className={styles.signal} data-signal><svg viewBox="0 0 16 16"><path d="M8 13 2.8 7.8C-.5 4.5 4 .5 8 4c4-3.5 8.5.5 5.2 3.8Z" /></svg></span>
      </div>
      <header className={styles.header}>
        <div className={styles.identity}><span className={styles.mark} aria-hidden="true">✳</span> {zh ? '佐治亚大学 · 政治学' : 'University of Georgia · Political Science'}</div>
        <nav className={styles.homeNav} aria-label="Primary navigation">
          {getPrimaryNavigation(locale).map(item => <NavigationLink cvAvailable={cvAvailable} key={item.id} href={item.href} aria-current={item.id === 'home' ? 'page' : undefined}>{item.title}</NavigationLink>)}
        </nav>
        <div className={styles.themes} data-no-toggle role="group" aria-label="Color theme">
          {(['light', 'dark', 'system'] as const).map((value) => <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>{value}</button>)}
        </div>
      </header>

      <div className={styles.content}>
        <h1 id="portal-title" className={styles.srOnly}>Yao Yao — Home</h1>
        <div className={styles.title}><Link href="/about/" className={styles.titleToggle} data-particle-link aria-label="About Yao Yao" aria-describedby="home-help"><ParticleTitle /></Link><span className={styles.bracketLeft} aria-hidden="true">+</span><span className={styles.bracketRight} aria-hidden="true">+</span></div>
        <p className={styles.role}>{zh ? '佐治亚大学政治学系博士候选人' : 'PhD Candidate in Political Science, University of Georgia'}</p>
        <p className={styles.description}>{zh ? '研究官僚政治与三权分立。' : 'Bureaucratic politics and the separation of powers.'}</p>
        <p id="home-help" className={styles.srOnly}>{zh ? '点击名字进入关于页面。' : 'Select the name to visit About.'}</p>
        <p className={styles.hint}>{zh ? '把鼠标移近名字' : 'Move the cursor near the name'}</p>
      </div>

      <div className={`${styles.floating} ${styles.floatOne}`} aria-hidden="true"><i /></div>
      <div className={`${styles.floating} ${styles.floatTwo}`} aria-hidden="true"><span className={styles.cross}>+</span></div>
      <div className={styles.orbit} aria-hidden="true"><span /></div>
      <footer className={styles.footer}><a href="mailto:Yao.Yao1@uga.edu"><span className={styles.statusDot} /> Yao.Yao1@uga.edu</a><span>© Yao Yao</span></footer>
    </section>
  );
}
