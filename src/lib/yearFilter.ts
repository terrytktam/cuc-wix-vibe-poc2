/**
 * Utility functions for filtering data by the latest year
 */

/**
 * Get the latest year from an array of items with a year field
 * @param items Array of items with a year field (string or number)
 * @param yearField The name of the year field to check
 * @returns The latest year as a string, or null if no items or year field found
 */
export function getLatestYear<T extends Record<string, any>>(
  items: T[],
  yearField: string = 'year'
): string | null {
  if (!items || items.length === 0) {
    return null;
  }

  const years = items
    .map(item => item[yearField])
    .filter((year): year is string | number => year !== null && year !== undefined)
    .map(year => String(year));

  if (years.length === 0) {
    return null;
  }

  // Sort years in descending order and return the first (latest)
  return years.sort().reverse()[0];
}

/**
 * Filter items to only include those with the latest year
 * @param items Array of items to filter
 * @param yearField The name of the year field to check
 * @returns Filtered array containing only items with the latest year
 */
export function filterByLatestYear<T extends Record<string, any>>(
  items: T[],
  yearField: string = 'year'
): T[] {
  const latestYear = getLatestYear(items, yearField);

  if (!latestYear) {
    return items;
  }

  return items.filter(item => String(item[yearField]) === latestYear);
}
