export const initialState = {
  basket: [],
};
//Selector
//reduce iterates the items and adds the items

export const getBasketTotal = (basket) => {
  const finalValue = basket?.reduce((amount, items) => items.price + amount, 0);
  return finalValue;
};

// how to dispact the action in to the data layer
// always listening for an action

const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.items],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user, // this is going to be the user
      };

    default:
      return state;
  }
};

export default reducer;
