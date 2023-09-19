import { createAction } from "@reduxjs/toolkit";

export type Update = {
  id: number;
  caption: string;
  amount: string;
};

export default createAction<Update>("UPDATE_ITEM");
