import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7;
const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export const createSession = async (userId: number) => {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
};

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
};

export const getSessionUserId = async (): Promise<number | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret);
        return typeof payload.userId === "number" ? payload.userId : null;
    } catch {
        return null;
    }
};