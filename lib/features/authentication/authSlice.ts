import { createAppSlice } from "@/lib/createAppSlice";
import { IMe, ICredentials } from "@/typing/interface";
import { RequestStatusEnum } from "@/typing/enum";
import {
  get_authentication_token,
  delete_authentication_token,
  get_user,
  get_default_signature,
} from "./actions";
import { toast } from "sonner";
import { PayloadAction } from "@reduxjs/toolkit";
import { signLetter } from "../letter/letterSlice";
export interface IAuthSliceState {
  me: IMe;
  default_signature: string;
  is_authenticated: boolean;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IAuthSliceState = {
  me: {} as IMe,
  is_authenticated: false,
  default_signature: "",
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const authSlice = createAppSlice({
  name: "authentication",
  initialState,

  reducers: (create) => ({
    login: create.asyncThunk(
      async (credentials: ICredentials) => {
        await get_authentication_token(credentials);
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.loading("Logging in, please wait...");
        },
        fulfilled: (state, _) => {
          state.status = RequestStatusEnum.IDLE;
          state.is_authenticated = true;
          state.error = null;
          toast.dismiss();
          toast.success("Welcome back! You have successfully logged in.");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
          state.is_authenticated = false;
          toast.dismiss();
          toast.error(action.error.message || "Failed to login");
        },
      }
    ),
    logout: create.asyncThunk(
      async () => {
        const response = await delete_authentication_token();
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
        },
        fulfilled: (state) => {
          state.status = RequestStatusEnum.IDLE;
          state.is_authenticated = false;
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
        },
      }
    ),
    getMe: create.asyncThunk(
      async () => {
        const response = await get_user();
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<IMe>) => {
          state.status = RequestStatusEnum.IDLE;
          state.me = action.payload;
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
        },
      }
    ),
    resetDefaultSignature: create.reducer((state, _) => {
      state.default_signature = initialState.default_signature;
    }),
    getDefaultSignature: create.asyncThunk(
      async (password: string, { dispatch }) => {
        const response = await get_default_signature(password);
        const imageUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${response.signature}`;
        fetch(imageUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.blob();
          })
          .then((blob) => {
            const file = new File([blob], "default_signature.png", {
              type: "image/png",
            });
            dispatch(signLetter(file));
            console.log("File:", file);
          })
          .catch((error) => {
            console.error(
              "Error fetching or converting image URL to file:",
              error
            );
          });
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Verifying your password, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<{ message: string; signature_image: string }>
        ) => {
          state.status = RequestStatusEnum.IDLE;
          state.default_signature = action.payload.signature_image;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload.message);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to verify password";
          state.error = action.error.message || "Failed to verify password";
          toast.dismiss();
          toast.error(action.error.message || "Failed to verify password");
        },
      }
    ),
  }),

  selectors: {
    selectMe: (authentication) => authentication.me,
    selectIsAuthenticated: (authentication) => authentication.is_authenticated,
    selectDefaultSignature: (authentication) =>
      authentication.default_signature,
    selectStatus: (authentication) => authentication.status,
    selectError: (authentication) => authentication.error,
  },
});

export const {
  login,
  logout,
  getMe,
  getDefaultSignature,
  resetDefaultSignature,
} = authSlice.actions;
export const {
  selectMe,
  selectIsAuthenticated,
  selectDefaultSignature,
  selectStatus,
  selectError,
} = authSlice.selectors;
