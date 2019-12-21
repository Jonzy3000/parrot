import React from "react";
import { Grommet } from "grommet";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./components/authentication/redux/userReducer";
import userSessionReducer from "./components/authentication/redux/userSessionReducer";
import { RootState } from "./types/RootState";
import { BrowserRouter, Route } from "react-router-dom";
import { LoginWindow } from "./components/LoginWindow";
import PageLayout from "./components/PageLayout";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const store = configureStore<RootState>({
  reducer: { userState: userReducer, userSessionState: userSessionReducer }
});

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/callback" component={LoginWindow} />
          <Route exact path="/" component={() => <PageLayout />} />
        </BrowserRouter>
      </Provider>
    </Grommet>
  );
};

export default App;
