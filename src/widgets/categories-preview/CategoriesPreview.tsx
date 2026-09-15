import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@shared/api';
import styles from './CategoriesPreview.module.scss';

export function CategoriesPreview() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Категории</h2>

      {isLoading && <div className={styles.loading}>Загрузка...</div>}

      {!isLoading && (!categories || categories.length === 0) && (
        <div className={styles.empty}>Пока нет категорий</div>
      )}

      {!isLoading && categories && categories.length > 0 && (
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/quiz?categoryId=${category.id}`}
              className={styles.card}
            >
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categorySlug}>/{category.slug}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}