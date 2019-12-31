import React from "react";
import { Grommet } from "grommet";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./components/authentication/redux/userReducer";
import userSessionReducer from "./components/authentication/redux/userSessionReducer";
import playlistsReducer from "./components/playlists/redux/playlistsReducer";
import recommendationsRedcuer from "./components/playlists/redux/recommendationsRedcuer";
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
import { PlaylistView } from "./views/PlaylistView";
import { PreviewPlaylistView } from "./views/PreviewPlaylistView";
import PageLayout from "./components/common/PageLayout";
import { withLogin } from "./components/authentication/withLogin";
import { NewPlaylistView } from "./views/NewPlaylistView";

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
    recommendationsState: recommendationsRedcuer,
    router: connectRouter(history)
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
});

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Provider store={store}>
        <PageLayout>
          <ConnectedRouter history={history}>
            <Route path="/callback" component={LoginWindow} />
            <Route exact path="/" component={withLogin(Home)} />
            <Route path="/playlists/:id" component={withLogin(PlaylistView)} />
            <Route
              path="/preview-playlist"
              component={withLogin(PreviewPlaylistView)}
            />
            <Route
              path="/new-playlist"
              component={withLogin(NewPlaylistView)}
            />
          </ConnectedRouter>
        </PageLayout>
      </Provider>
    </Grommet>
  );
};

export default App;
