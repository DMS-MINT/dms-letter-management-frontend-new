import { createAppSlice } from "@/lib/createAppSlice";
import {
  ILetterDetails,
  ILetterListInputSerializer,
  LetterType,
  IParticipantInputSerializer,
  IAttachment,
  IPermissionsInputSerializer,
} from "@/typing/interface";
import {
  get_letters,
  get_letter_details,
  create_letter,
  update_letter,
  delete_letter,
  create_or_submit_letter,
} from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";
import { setPermissions } from "./workflow/workflowSlice";
import { RootState } from "@/lib/store";

export interface ILetterSliceState {
  letters: ILetterListInputSerializer[];
  letterDetails: ILetterDetails;
  attachments: File[];
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: ILetterSliceState = {
  letters: [] as ILetterListInputSerializer[],
  letterDetails: {
    participants: [] as IParticipantInputSerializer[],
    attachments: [] as IAttachment[],
  } as ILetterDetails,
  attachments: [] as File[],
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const letterSlice = createAppSlice({
  name: "letter",
  initialState,

  reducers: (create) => ({
    resetLetterDetail: create.reducer((state, _) => {
      state.letterDetails = initialState.letterDetails;
    }),
    updateSubject: create.reducer((state, action: PayloadAction<string>) => {
      state.letterDetails.subject = action.payload;
    }),
    updateContent: create.reducer((state, action: PayloadAction<string>) => {
      state.letterDetails.content = action.payload;
    }),
    setLetterType: create.reducer(
      (state, action: PayloadAction<LetterType>) => {
        state.letterDetails.letter_type = action.payload;
      }
    ),
    addParticipant: create.reducer(
      (state, action: PayloadAction<IParticipantInputSerializer>) => {
        state.letterDetails.participants.push(action.payload);
      }
    ),
    removeParticipant: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.letterDetails.participants.map((participant) => {
          if (participant.user.user_type === "member") {
            state.letterDetails.participants =
              state.letterDetails.participants.filter(
                (participant) =>
                  participant.user.user_type !== "member" ||
                  participant.user.id !== action.payload
              );
          } else if (participant.user.user_type === "guest") {
            state.letterDetails.participants =
              state.letterDetails.participants.filter(
                (participant) =>
                  participant.user.user_type !== "guest" ||
                  participant.user.id !== action.payload
              );
          }
        });
      }
    ),
    signLetter: create.reducer((state, action: PayloadAction<File>) => {
      console.log(action.payload);
      state.letterDetails.signature = action.payload;
    }),
    removeSignature: create.reducer((state, _) => {
      state.letterDetails.signature = state.letterDetails.signature;
    }),
    addAttachment: create.reducer((state, action: PayloadAction<File>) => {
      state.attachments.push(action.payload);
    }),
    removeAttachment: create.reducer((state, action: PayloadAction<number>) => {
      state.attachments.splice(action.payload, 1);
    }),
    updateLetterDetails: create.reducer(
      (state, action: PayloadAction<ILetterDetails>) => {
        state.letterDetails = { ...action.payload };
      }
    ),
    getLetters: create.asyncThunk(
      async (category: string) => {
        const response = await get_letters(category);
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Fetching letters, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterListInputSerializer[]>
        ) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.error = null;
          state.letters = action.payload;
          toast.dismiss();
          toast.success("Letters successfully retrieved!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to fetch letters";
          toast.dismiss();
          toast.error(action.error.message || "Failed to fetch letters");
        },
      }
    ),
    getLetterDetails: create.asyncThunk(
      async (reference_number: string, { dispatch, getState }) => {
        const response = await get_letter_details(reference_number);
        const letterDetails: ILetterDetails = response.data;
        const permissions: IPermissionsInputSerializer[] = response.permissions;
        const { me } = (getState() as RootState).authentication;
        dispatch(setPermissions({ permissions, me }));
        return letterDetails;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Fetching letter details, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<ILetterDetails>) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.error = null;
          state.letterDetails = action.payload;
          toast.dismiss();
          toast.success("Letter details successfully retrieved!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error =
            action.error.message || "Failed to fetch letter details";
          toast.dismiss();
          toast.error(action.error.message || "Failed to fetch letter details");
        },
      }
    ),
    createLetter: create.asyncThunk(
      async (letter: FormData) => {
        const response = await create_letter(letter);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Creating letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<ILetterDetails>) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.letterDetails = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully created!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to create letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to create letter");
        },
      }
    ),
    createOrSubmitLetter: create.asyncThunk(
      async (letter: FormData) => {
        const response = await create_or_submit_letter(letter);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Creating letter, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<{ data: ILetterDetails; message: string }>
        ) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.letterDetails = action.payload.data;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload.message);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to create letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to create letter");
        },
      }
    ),
    updateLetter: create.asyncThunk(
      async ({
        reference_number,
        letter,
      }: {
        reference_number: string;
        letter: FormData;
      }) => {
        const response = await update_letter(reference_number, letter);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Updating letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<ILetterDetails>) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.letterDetails = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully updated!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to update letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to update letter");
        },
      }
    ),
    deleteLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await delete_letter(reference_number);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Deleting letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<ILetterDetails>) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.letterDetails = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully deleted!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to delete letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to delete letter");
        },
      }
    ),
  }),

  selectors: {
    selectLetters: (letter) => letter.letters,
    selectLetterDetails: (letter) => letter.letterDetails,
    selectStatus: (letter) => letter.status,
    selectError: (letter) => letter.error,
    selectAttachments: (letter) => letter.attachments,
  },
});

export const {
  resetLetterDetail,
  updateSubject,
  updateContent,
  signLetter,
  setLetterType,
  addParticipant,
  removeParticipant,
  addAttachment,
  removeAttachment,
  getLetters,
  getLetterDetails,
  createLetter,
  createOrSubmitLetter,
  updateLetter,
  deleteLetter,
  updateLetterDetails,
} = letterSlice.actions;
export const {
  selectLetters,
  selectLetterDetails,
  selectAttachments,
  selectStatus,
  selectError,
} = letterSlice.selectors;
