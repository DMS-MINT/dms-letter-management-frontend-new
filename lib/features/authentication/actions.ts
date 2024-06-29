"use server";

import axiosInstance from "@/lib/axiosInstance";
import { ICredentials } from "@/typing/interface";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { handleAxiosError } from "@/utils";

const SESSION_NAME = "DMS";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function get_session() {
  const session = cookies().get(SESSION_NAME)?.value;
  if (!session) return null;

  return await decrypt(session);
}

export async function get_authentication_token(credentials: ICredentials) {
  try {
    const response = await axiosInstance.post("auth/login/", credentials);
    const data = await response.data;

    const sessionId = data.session;

    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const session = await encrypt({ sessionId, expires });

    cookies().set(SESSION_NAME, session, {
      expires: expires,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function delete_authentication_token() {
  try {
    await axiosInstance.get("auth/logout/");

    cookies().set(SESSION_NAME, "", { expires: new Date(0) });
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function get_user() {
  try {
    const response = await axiosInstance.get("auth/me/");
    const data = await response.data;
    return data.data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function get_default_signature(password: string) {
  try {
    const response = await axiosInstance.post("auth/retrieve-signature/", {
      password,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
