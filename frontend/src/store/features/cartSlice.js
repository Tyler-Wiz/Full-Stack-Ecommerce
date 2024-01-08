import { getFromLocalStorage } from "@/utils/getLocalStorage";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItem: getFromLocalStorage("cartItems")
    ? JSON.parse(getFromLocalStorage("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //  Add To Cart
    addToCart: (state, { payload }) => {
      const item = state.cartItem.find((x) => x.id === payload.id);
      if (item) {
        item.cartQuantity += 1;
        toast.success(`${item.name} Added to Cart! `, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        const product = {
          ...payload,
          cartQuantity: 1,
        };
        state.cartItem.push(product);
        toast.success(`${product.name} Added to Cart! `, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    // Decrease Quantity Of Item in Cart
    decreaseQuantity: (state, action) => {
      const product = state.cartItem.find((x) => x.id === action.payload);
      if (product.cartQuantity === 1) {
        state.cartItem = state.cartItem.filter(
          (cart) => cart.id !== action.payload
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
        toast.success(`${product.name} Removed From Cart! `, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        product.cartQuantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      }
    },
    // Remove Item From Cart
    removeFromCart: (state, action) => {
      const product = state.cartItem.find((x) => x.id === action.payload);
      state.cartItem = state.cartItem.filter(
        (cart) => cart.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      toast.success(`${product.name} Removed From Cart! `, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    },
    // Get Total Quantity and Total Price Of Items In Cart
    getCartTotal: (state) => {
      let { total, quantity } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const { cartQuantity } = cartItem;
          let price;
          if (cartItem.discount) {
            price = cartItem.price - cartItem.price * (cartItem.discount / 100);
          } else {
            price = cartItem.price;
          }
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(3));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart: (state) => {
      state.cartItem = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, getCartTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
