export function generateRandomString(length = 15) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
}
export function sum<T>(array?: T[], key: keyof T | undefined = undefined) {
  if (!array) return 0;
  return (
    array
      .map((v) => (!key ? v : v?.[key]))
      .map((v) => (v ? Number(v) : null))
      .filter((v) => (v > 0 || v < 0) && !isNaN(v as any))
      .reduce((sum, val) => (sum || 0) + (val as number), 0) || 0
  );
}
export function randomInt(max, min = 5) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function studentDisplayName({ name, surname, otherName }) {
  return [name, surname, otherName].filter(Boolean).join(" ");
}
export function composeQuery<T>(queries: T[]): T | undefined {
  if (!Array.isArray(queries) || queries.length === 0) {
    return undefined;
  }
  return queries.length > 1
    ? ({
        AND: queries,
      } as T)
    : queries[0];
}
