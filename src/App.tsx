import React from "react";
import { Grommet } from "grommet";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./components/authentication/redux/userReducer";
import userSessionReducer from "./components/authentication/redux/userSessionReducer";
import playlistsReducer from "./components/playlists/redux/playlistsReducer";
import { RootState } from "./types/RootState";
import { Route } from "react-router-dom";
import { LoginWindow } from "./components/authentication/LoginWindow";
import { Home } from "./views/Home";
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from "connected-react-router";
import { createBrowserHistory } from "history";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const history = createBrowserHistory();

// any as action type to fix typings with connected-react-router
const store = configureStore<RootState, any>({
  reducer: {
    userState: userReducer,
    userSessionState: userSessionReducer,
    playlistsState: playlistsReducer,
    router: connectRouter(history)
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
});

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/callback" component={LoginWindow} />
          <Route exact path="/" component={Home} />
        </ConnectedRouter>
      </Provider>
    </Grommet>
  );
};

export default App;
