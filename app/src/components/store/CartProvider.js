import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCarttemIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingCartItem = state.items[existingCarttemIdx];
    let updatedItem;
    let updatedItems;

    if (exisitingCartItem) {
      updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCarttemIdx] = updatedItem;
    } else {
      updatedItem = { ...action.item };
      updatedItems = state.items.concat(action.item); // don't use push because it would edit the existing array you use concat because it returns a new array and you want to update state in an inmuttable way
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
