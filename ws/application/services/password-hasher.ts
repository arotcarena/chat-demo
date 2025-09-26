import bcrypt from "bcrypt";

export const hashPassword = async (plain: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(plain, saltRounds);
}

export const verifyPassword = async (hash: string, plain: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}
