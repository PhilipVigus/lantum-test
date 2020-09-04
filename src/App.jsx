import React from "react";
import { Provider } from "react-redux";
import SessionList from "./components/SessionList";
import GlobalStyle from "./GlobalStyle";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <SessionList />
    </Provider>
  );
};

export default App;
