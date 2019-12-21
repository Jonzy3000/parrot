import React from "react";
import { withLogin } from "./authentication/withLogin";
import { getUser } from "./authentication/redux/userReducer";
import { useDispatch } from "react-redux";

const PageLayout = React.memo(() => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
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
  );
});

export default withLogin(PageLayout);
