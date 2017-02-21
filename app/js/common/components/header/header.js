import { createStore } from "redux";

export const setCurrentMenu = (menu) => {
  return {
    type: "SET_CURRENT_MENU",
    menu
  };
};

export const toggleMenu = (value) => {
  return {
    type: "TOGGLE_MENU",
    value
  };
};

const initialState = {
  selectedMenu: null,
  menuStatus: false
};

const Menu = (state = initialState, action) => {
  switch(action.type) {
    case "SET_CURRENT_MENU":
      return {
        ...state,
        selectedMenu: action.menu
      }
    case "TOGGLE_MENU":
      return {
        ...state,
        menuStatus: action.value
      }
    default:
      return state;
  }
};

export const MenuStore = createStore(Menu);

