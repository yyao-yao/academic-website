import type { CardPageConfig } from '@/types/page';
import styles from './TeachingPage.module.css';

/** Teaching appointments: course title, then institution and semester, then courses and awards. */
export default function TeachingPage({ config }: { config: CardPageConfig }) {
    return <div className={styles.page} data-teaching-page>
        <h1 className={styles.title}>{config.title}</h1>
        {config.teaching?.map(section => <section key={section.id} className={styles.section} aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            <div>
                {section.items.map(item => <article key={`${item.institution}-${item.title}`} className={styles.entry} data-teaching-appointment>
                    <h3>{item.title}</h3>
                    <p>{(() => {
                        const zh = /[\u4e00-\u9fff]/.test(item.semester);
                        const level = item.level || (zh ? '本科课程' : 'Undergraduate');
                        const where = item.title !== item.institution ? `${level}${zh ? '，' : ', '}${item.institution}${zh ? '。' : '. '}` : '';
                        return `${where}${item.semester}${zh ? '。' : '.'}`;
                    })()}</p>
                    {item.courses && <p><span className={styles.label}>{item.courses_label}{/[\u4e00-\u9fff]/.test(item.semester) ? '：' : ': '}</span>{item.courses.join('; ')}{/[\u4e00-\u9fff]/.test(item.semester) ? '。' : '.'}</p>}
                    {item.recognition && <p className={styles.recognition} data-teaching-recognition>{item.recognition}{/[\u4e00-\u9fff]/.test(item.recognition_institution || '') ? '，' : ', '}{item.recognition_institution}</p>}
                </article>)}
            </div>
        </section>)}
    </div>;
}
