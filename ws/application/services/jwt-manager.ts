import { SignJWT, jwtVerify } from "jose";

// charge un secret depuis les variables d'env
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// crée un JWT (ex: 15 minutes)
export const createJwt = async (
  payload: Record<string, unknown>,
  expiresIn: string | number = "15m"
): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

// vérifie un JWT et renvoie son payload (throw une erreur si invalide/expiré)
export const verifyJwt = async <T extends Record<string, unknown> = Record<string, unknown>>(
  token: string
): Promise<T> => {
  const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
  return payload as T;
}
