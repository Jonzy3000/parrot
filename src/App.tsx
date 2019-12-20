import React from "react";
import { Grommet } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
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
          <pre>{JSON.stringify(process.env, undefined, 2)}</pre>
        </a>
      </header>
    </Grommet>
  );
};

export default App;
