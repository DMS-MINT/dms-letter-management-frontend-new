import { IServerErrorResponse } from "@/typing/interface";
import axios, { AxiosError } from "axios";

const handleAxiosError = (error: any) => {
  if (
    axios.isAxiosError<IServerErrorResponse, Record<string, unknown>>(error)
  ) {
    if (error.response) {
      const responseData = error.response.data;
      // console.error(responseData)
      if (
        responseData.message === "Validation error" &&
        responseData.extra?.fields
      ) {
        responseData.extra.fields.forEach((field: string) => {
          // console.error(field);
          throw new Error(field);
        });
        // throw new Error("Validation error occurred");
      } else {
        throw new Error(responseData.message);
      }
      // throw new Error("An unknown error occurred");
    }
  } else if (error.request) {
    throw new Error("Network Error: No response received");
  } else {
    throw new Error("Request Error: Unable to send request");
  }
};

export default handleAxiosError;
