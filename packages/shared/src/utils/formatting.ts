/**
 * Format a number as a percentage
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Truncate a string to a specified length
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }
  return `${str.substring(0, maxLength - 3)}...`;
};

/**
 * Convert rating (1-5) to descriptive text
 */
export const ratingToText = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Elementary';
    case 3:
      return 'Intermediate';
    case 4:
      return 'Advanced';
    case 5:
      return 'Expert';
    default:
      return 'Unknown';
  }
};

/**
 * Format job match score with color indicator
 */
export const formatMatchScore = (score: number): { text: string; color: string } => {
  const text = formatPercentage(score);
  
  if (score >= 80) {
    return { text, color: '#10B981' }; // Fresh Green
  } else if (score >= 60) {
    return { text, color: '#F59E0B' }; // Amber
  } else {
    return { text, color: '#F43F5E' }; // Rose
  }
};