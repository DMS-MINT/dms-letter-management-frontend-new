import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IUIManagerSliceState {
  isDrawerOpen: boolean;
  isReadonly: boolean;
}

const initialState: IUIManagerSliceState = {
  isDrawerOpen: true,
  isReadonly: false,
};

export const uiManagerSlice = createAppSlice({
  name: "ui",
  initialState,

  reducers: (create) => ({
    toggleDrawerVisibility: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isDrawerOpen = action.payload;
      }
    ),
    toggleIsReadOnly: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isReadonly = action.payload;
      }
    ),
  }),
  selectors: {
    selectIsDrawerOpen: (ui) => ui.isDrawerOpen,
    selectIsReadonly: (ui) => ui.isReadonly,
  },
});

export const { toggleDrawerVisibility, toggleIsReadOnly } =
  uiManagerSlice.actions;
export const { selectIsDrawerOpen, selectIsReadonly } =
  uiManagerSlice.selectors;
