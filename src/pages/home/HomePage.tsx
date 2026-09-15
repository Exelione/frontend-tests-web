import { Hero } from '@widgets/hero';
import { HowItWorks } from '@widgets/how-it-works';
import { CategoriesPreview } from '@widgets/categories-preview';
import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <HowItWorks />
      <CategoriesPreview />
    </div>
  );
}