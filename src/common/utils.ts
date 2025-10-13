export const isJestTest: boolean = typeof jest !== "undefined";

export const isNullOrEmpty = (value: string | null | undefined): boolean => {
  if (value == null) {
    return true;
  }
  if (!isTypeString(value)) {
    return false ;
  }
  return value.trim().length === 0;
};

export const isTypeString = (value: unknown): boolean => {
  return typeof value === "string";
};