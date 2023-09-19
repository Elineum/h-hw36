import { createAction } from "@reduxjs/toolkit";

export type Remove = {
  id: number;
};

export default createAction<Remove>("REMOVE_GOODS");
