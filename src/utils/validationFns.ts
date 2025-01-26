export const validateLength = (value: string, minValue: number): boolean => {
  return value.length >= minValue;
};

export const validateEmail = (value: string): boolean => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value);
};