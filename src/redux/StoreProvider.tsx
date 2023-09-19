import React from "react";
import { Provider } from "react-redux";
import { configureStore, createReducer, createSlice } from "@reduxjs/toolkit";
import createAddGoodsAction from "./actions/createAddGoodsAction";
import createRemoveGoodsAction from "./actions/createRemoveGoodsAction";
import createUpdateItemAction from "./actions/createUpdateItemAction";

type GoodsItem = {
  id: number;
  caption: string;
  amount: string;
};

const initialValue: GoodsItem[] = [];

const reducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(createAddGoodsAction, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(createRemoveGoodsAction, (state, action) => {
      return state.filter((goods) => goods.id !== action.payload.id);
    })
    .addCase(createUpdateItemAction, (state, action) => {
      return state.map((good) =>
        good.id === action.payload.id ? action.payload : good
      );
    });
});

type StoreProviderProps = {
  children: React.ReactNode;
};

const localStorage: Storage | null = window.localStorage;
const localData: string | null = localStorage.getItem("shopState");
const parsedData: [] = localData !== null ? JSON.parse(localData) : [];

const store = configureStore({ reducer, preloadedState: parsedData });

store.subscribe(() => {
  const stringifyedState = JSON.stringify(store.getState());
  localStorage.setItem("shopState", stringifyedState);
});

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
