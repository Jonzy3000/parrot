import React from "react";
import { Grommet } from "grommet";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const store = configureStore({ reducer: {} });

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Provider store={store}>
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Provider>
    </Grommet>
  );
};

export default App;
