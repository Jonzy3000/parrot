import React from "react";
import { Header } from "./Header";
import { Main, ResponsiveContext } from "grommet";

// TODO think about if we want to fetch the user everytime this component mounts
const PageLayout = React.memo(({ children }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <div>
      <Header />
      <Main pad={size === "small" ? "medium" : "xlarge"}>{children}</Main>
    </div>
  );
});

export default PageLayout;
