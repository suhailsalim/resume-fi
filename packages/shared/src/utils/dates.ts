/**
 * Format a date to YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Format a date range (e.g., "Jan 2020 - Present")
 */
export const formatDateRange = (startDate: Date, endDate?: Date, current = false): string => {
  const start = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  if (current) {
    return `${start} - Present`;
  }
  
  if (endDate) {
    const end = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${start} - ${end}`;
  }
  
  return start;
};

/**
 * Get difference between two dates in months
 */
export const getMonthDifference = (startDate: Date, endDate: Date): number => {
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  return months + endDate.getMonth() - startDate.getMonth();
};

/**
 * Convert a Firestore timestamp to a JavaScript Date
 */
export const timestampToDate = (timestamp: any): Date => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};