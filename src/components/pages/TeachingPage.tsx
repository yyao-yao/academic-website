import type { CardPageConfig } from '@/types/page';
import styles from './TeachingPage.module.css';

const hasCJK = (s?: string) => /[\u4e00-\u9fff]/.test(s || '');

/** Teaching: course title and semester on one row, then level and institution, then courses and awards. */
export default function TeachingPage({ config }: { config: CardPageConfig }) {
    return <div className={styles.page} data-teaching-page>
        <h1 className={styles.title}>{config.title}</h1>
        {config.teaching?.map(section => <section key={section.id} className={styles.section} aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            <div>
                {section.items.map(item => {
                    const zh = hasCJK(item.semester);
                    const meta = [item.level, item.title !== item.institution ? item.institution : undefined].filter(Boolean);
                    return <article key={`${item.institution}-${item.title}`} className={styles.entry} data-teaching-appointment>
                        <div className={styles.head}>
                            <h3>{item.title}</h3>
                            <span className={styles.when}>{item.semester}</span>
                        </div>
                        {meta.length > 0 && <p>{meta.join(' • ')}</p>}
                        {item.courses && <p><span className={styles.label}>{item.courses_label}{zh ? '：' : ': '}</span>{item.courses.join('; ')}{zh ? '。' : '.'}</p>}
                        {item.recognition && <p className={styles.recognition} data-teaching-recognition>{item.recognition}{hasCJK(item.recognition_institution) ? '，' : ', '}{item.recognition_institution}</p>}
                    </article>;
                })}
            </div>
        </section>)}
    </div>;
}
