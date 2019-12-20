import React from "react";
import { withLogin } from "./authentication/withLogin";

const PageLayout = React.memo(() => (
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
));

export default withLogin(PageLayout);
