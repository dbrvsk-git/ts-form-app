/**
 * Debounce funkce
 * zavolá fn až po určité době od posledního spuštění
 *
 * T = typ funkce, kterou debouncujeme
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    // zruší předchozí čekající spuštění
    clearTimeout(timeoutId);

    // nastaví nové
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
