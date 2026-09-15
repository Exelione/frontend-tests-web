import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@shared/api';
import { Select, Spinner } from '@shared/ui';
import styles from './CategorySelect.module.scss';

interface CategorySelectProps {
  value: string | undefined;
  onChange: (categoryId: string | undefined) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.label}>Категория</span>
        <div className={styles.loading}>
          <Spinner size="sm" label="Загрузка категорий..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.label}>Категория</span>
        <div className={styles.error}>Не удалось загрузить категории</div>
      </div>
    );
  }

  const options = [
    { value: '', label: 'Все категории' },
    ...(categories?.map((cat) => ({ value: cat.id, label: cat.name })) ?? []),
  ];

  return (
    <Select
      label="Категория"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || undefined)}
      options={options}
    />
  );
}