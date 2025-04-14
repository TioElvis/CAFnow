export function hash(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  let x = "";

  for (let i = 0; i < length; i++) {
    const j = Math.floor(Math.random() * characters.length);
    x += characters[j];
  }

  return x;
}
