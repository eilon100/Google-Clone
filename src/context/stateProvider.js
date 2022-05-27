import React, { createContext, useContext, useReducer } from "react";

//context with useReducer for the search info and the lang info

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const initialState = {
    lang: "hebrew",
    inputState: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "lang":
        if (action.id === "hebrew") {
          return { ...state, lang: "hebrew" };
        }
        if (action.id === "english") {
          return { ...state, lang: "english" };
        }
        if (action.id === "arabic") {
          return { ...state, lang: "arabic" };
        }
      case "inputState":
        return { ...state, inputState: action.id };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
