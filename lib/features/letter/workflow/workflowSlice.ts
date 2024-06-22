import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";
import { IPermissions } from "@/typing/interface";
import {
  close_letter,
  publish_letter,
  retract_letter,
  share_letter,
  submit_letter,
} from "./actions";

export interface IWorkflowSliceState {
  permissions: IPermissions;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IWorkflowSliceState = {
  permissions: {} as IPermissions,
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const workflowSlice = createAppSlice({
  name: "workflow",
  initialState,

  reducers: (create) => ({
    setPermissions: create.reducer(
      (state, action: PayloadAction<IPermissions>) => {
        state.permissions = action.payload;
      }
    ),
    shareLetter: create.asyncThunk(
      async ({
        reference_number,
        participant,
      }: {
        reference_number: string;
        participant: { to: Array<string>; message: string };
      }) => {
        const response = await share_letter(reference_number, participant);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Sharing letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to share letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to share letter");
        },
      }
    ),
    submitLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await submit_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Submitting letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to submit letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to submit letter");
        },
      }
    ),
    publishLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await publish_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Publishing letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to publish letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to publish letter");
        },
      }
    ),
    retractLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await retract_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Retract letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to retract letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to retract letter");
        },
      }
    ),
    closeLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await close_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Close letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to close letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to close letter");
        },
      }
    ),
  }),

  selectors: {
    selectPermissions: (workflow) => workflow.permissions,
    selectStatus: (workflow) => workflow.status,
    selectError: (workflow) => workflow.error,
  },
});

export const {
  setPermissions,
  shareLetter,
  submitLetter,
  publishLetter,
  retractLetter,
  closeLetter,
} = workflowSlice.actions;
export const { selectPermissions, selectStatus, selectError } =
  workflowSlice.selectors;
