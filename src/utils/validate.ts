export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  return digitsOnly.length === 11 && digitsOnly.startsWith("0");
};
