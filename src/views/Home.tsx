import React from "react";
import PageLayout from "../components/common/PageLayout";
import { Welcome } from "../components/home/Welcome";
import { PlaylistLists } from "../components/playlists/PlaylistList";

export const Home = React.memo(() => {
  return (
    <PageLayout>
      <Welcome />
      <PlaylistLists />
    </PageLayout>
  );
});
