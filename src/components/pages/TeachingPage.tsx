import type { CardPageConfig } from '@/types/page';
import styles from './TeachingPage.module.css';

/** Teaching appointments: dates in a left column, course and details on the right. */
export default function TeachingPage({ config }: { config: CardPageConfig }) {
    return <div className={styles.page} data-teaching-page>
        <h1 className={styles.title}>{config.title}</h1>
        {config.teaching?.map(section => <section key={section.id} className={styles.section} aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            <div>
                {section.items.map(item => <article key={`${item.institution}-${item.title}`} className={styles.entry} data-teaching-appointment>
                    <span className={styles.date}>{item.semester.split(' – ').map((part, i, parts) => <span key={i} className={styles.datePart}>{part}{i < parts.length - 1 ? ' –' : ''}</span>)}</span>
                    <div className={styles.body}>
                        <h3>{item.title}</h3>
                        {item.title !== item.institution && <p>Undergraduate, {item.institution}</p>}
                        {item.courses && <p><span className={styles.label}>{item.courses_label}:</span> {item.courses.join('; ')}.</p>}
                        {item.recognition && <p className={styles.recognition} data-teaching-recognition>{item.recognition}, {item.recognition_institution}</p>}
                    </div>
                </article>)}
            </div>
        </section>)}
    </div>;
}
