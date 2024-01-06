import { getFromLocalStorage } from "@/utils/getLocalStorage";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishList: getFromLocalStorage("wishlist")
    ? JSON.parse(getFromLocalStorage("wishlist"))
    : [],
  itemsQuantity: 0,
  itemsTotal: 0,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWishList: (state, { payload }) => {
      const item = state.wishList.find((x) => x.id === payload.id);
      if (item) {
        item.itemsQuantity += 1;
        toast.success(`${item.name} Added to Wishlist! `, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        const product = {
          ...payload,
          itemsQuantity: 1,
        };
        state.wishList.push(product);
        toast.success(`${product.name} Added to Wishlist! `, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
    removeWish: (state, action) => {
      const product = state.wishList.find((x) => x.id === action.payload);
      state.wishList = state.wishList.filter(
        (wish) => wish.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
      toast.success(`${product.name} Removed From Wishlist! `, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    },
    getTotal: (state) => {
      const itemsTotal = state.wishList.reduce(
        (total, item) => total + item.itemsQuantity,
        0
      );
      state.itemsTotal = itemsTotal;
    },
    clearWishList: (state) => {
      state.wishList = [];
      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
  },
});

export const { addToWishList, removeWish, getTotal, clearWishList } =
  wishSlice.actions;
export default wishSlice.reducer;
