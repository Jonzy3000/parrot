import React from "react";
import { withLogin } from "../authentication/withLogin";
import { getUser } from "../authentication/redux/userReducer";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { Main } from "grommet";

const PageLayout = React.memo(({ children }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Main pad="large">{children}</Main>
    </div>
  );
});

export default withLogin(PageLayout);
