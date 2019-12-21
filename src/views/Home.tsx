import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Welcome } from "../components/home/Welcome";

export const Home = React.memo(() => {
  return (
    <PageLayout>
      <Welcome />
    </PageLayout>
  );
});
