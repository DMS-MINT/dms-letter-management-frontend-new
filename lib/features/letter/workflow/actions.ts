"use server";

import axiosInstance from "@/lib/axiosInstance";
import { handleAxiosError } from "@/utils";

export async function share_letter(
  reference_number: string,
  participant: { to: Array<string>; message: string }
) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/share/`,
      participant
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function submit_letter(reference_number: string) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/submit/`
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function publish_letter(reference_number: string) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/publish/`
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function retract_letter(reference_number: string) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/retract/`
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}

export async function close_letter(reference_number: string) {
  try {
    const response = await axiosInstance.post(
      `letters/${reference_number}/close/`
    );
    const data = await response.data.message;
    return data;
  } catch (error: any) {
    handleAxiosError(error);
  }
}
