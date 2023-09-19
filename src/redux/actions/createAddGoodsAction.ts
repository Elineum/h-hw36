import { createAction } from "@reduxjs/toolkit";

export type AddGoods = { id: number; caption: string; amount: string };

export default createAction<AddGoods>("ADD_GOODS");
