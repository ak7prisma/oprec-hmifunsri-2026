export const getTimeInMillis = (dateValue: any): number => {
  if (!dateValue) return 0;
  
  if (typeof dateValue === 'object' && 'seconds' in dateValue) {
    return dateValue.seconds * 1000; 
  }
  
  return new Date(dateValue).getTime();
};

export const formatDateID = (dateValue: any): string => {
  const millis = getTimeInMillis(dateValue);
  return millis ? new Date(millis).toLocaleDateString("id-ID") : "-";
};