import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity and price
        const updatedCartItems = [...state.cartItems];
        const existingItem = updatedCartItems[existingItemIndex];
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // If it's a new item, add it to the cart
        const newItemWithTotalPrice = {
          ...newItem,
          totalPrice: newItem.quantity * newItem.price, // Calculate the total price for the new item
        };
        state.cartItems.push(newItemWithTotalPrice);
      }

      // Calculate cart totals
      state.itemsPrice = addDecimal(
        Number(
          state.cartItems.reduce(
            (acc, item) => acc + Number(item.totalPrice),
            0
          )
        )
      );

      state.shippingPrice = addDecimal(Number(state.itemsPrice > 100 ? 0 : 10));

      state.taxPrice = addDecimal(Number(state.itemsPrice * 0.15).toFixed(2));

      state.totalPrice = addDecimal(
        (
          Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
        ).toFixed(2)
      );

      // Update local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((element) => element._id !== id);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
