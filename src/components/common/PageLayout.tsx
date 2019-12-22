import React from "react";
import { Header } from "./Header";
import { Main } from "grommet";

// TODO think about if we want to fetch the user everytime this component mounts
const PageLayout = React.memo(({ children }) => {
  return (
    <div>
      <Header />
      <Main pad="xlarge">{children}</Main>
    </div>
  );
});

export default PageLayout;
