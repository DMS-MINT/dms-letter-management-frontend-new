import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";
import { IPermissions, IShareLetterFormData } from "@/typing/interface";
import {
  close_letter,
  publish_letter,
  reopen_letter,
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
    setPermissions: create.reducer((state, action: PayloadAction<string[]>) => {
      const permissions: IPermissions = {
        can_view_letter: false,
        can_update_letter: false,
        can_submit_letter: false,
        can_comment_letter: false,
        can_share_letter: false,
        can_delete_letter: false,
        can_retract_letter: false,
        can_archive_letter: false,
        can_close_letter: false,
        can_publish_letter: false,
        can_reject_letter: false,
        can_reopen_letter: false,
      };

      action.payload.forEach((permission) => {
        if (permission in permissions) {
          permissions[permission as keyof IPermissions] = true;
        }
      });
      state.permissions = permissions;
    }),
    shareLetter: create.asyncThunk(
      async ({
        reference_number,
        participants,
      }: {
        reference_number: string;
        participants: IShareLetterFormData;
      }) => {
        const response = await share_letter(reference_number, participants);
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
          toast.loading("Retracting letter, Please wait...");
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
          toast.loading("Closing letter, Please wait...");
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
    reopenLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await reopen_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Reopening letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to reopen letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to reopen letter");
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
  reopenLetter,
} = workflowSlice.actions;
export const { selectPermissions, selectStatus, selectError } =
  workflowSlice.selectors;
