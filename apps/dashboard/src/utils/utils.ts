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
